import { Metadata } from "@/actions/createCheckOutSession";
import { stripe } from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// مهم: التحقق من التوقيع بيحتاج Node.js crypto، لازم نمنع الـ Edge Runtime
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No Signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set.");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // بعض طرق الدفع (زي bank transfers) بتخلي الحدث ده يطلق قبل ما الدفع يكتمل فعليًا
    if (session.payment_status !== "paid") {
      console.log(`Session ${session.id} not paid yet, status: ${session.payment_status}`);
      return NextResponse.json({ received: true });
    }

    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      return NextResponse.json(
        { error: `Error creating order: ${error instanceof Error ? error.message : "Unknown error"}` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null,
) {
  // 1. حماية من التكرار (idempotency): لو Stripe أعاد إرسال نفس الـ event
  const existingOrder = await backendClient.fetch<{ _id: string } | null>(
    `*[_type == "order" && stripeCheckoutSessionId == $sessionId][0]{ _id }`,
    { sessionId: session.id },
  );

  if (existingOrder) {
    console.log(`Order for session ${session.id} already exists (${existingOrder._id}), skipping.`);
    return existingOrder;
  }

  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
    collected_information,
  } = session;

  // fallback عشان ما يطيحش الكود لو الـ metadata جاي undefined من Stripe
  const { orderNumber, customerName, customerEmail, clerkUserId } =
    (metadata || {}) as unknown as Metadata;

  if (!orderNumber || !customerEmail || !clerkUserId) {
    throw new Error(
      `Missing required metadata for session ${id}. Got: ${JSON.stringify(metadata)}`,
    );
  }

  const stripeCustomerId =
    typeof customer === "string" ? customer : customer?.id;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    { expand: ["data.price.product"] },
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item?.quantity || 0,
  }));

  const address = collected_information?.shipping_details?.address;
  const shippingAddressData = address
    ? {
        name: collected_information?.shipping_details?.name || "",
        line1: address.line1 || "",
        line2: address.line2 || "",
        city: address.city || "",
        state: address.state || "",
        postalCode: address.postal_code || "",
        country: address.country || "",
      }
    : undefined;

  const orderDocId = `order.${id}`; // معرف ثابت ومرتبط بالـ session، يمنع أي سباق (race condition) بين محاولتين متزامنتين

  // 2. تجميع خصم الستوك + إنشاء الطلب في نفس الـ transaction
  // عشان لو أي جزء فشل، محدش يتنفذ من غيره (atomicity)
  const transaction = backendClient.transaction();

  for (const item of lineItemsWithProduct.data) {
    const productId = (item?.price?.product as Stripe.Product)?.metadata?.id;
    const quantity = item?.quantity || 0;
    console.log(`Product ID: ${productId} | Item Quantity: ${quantity}`);
    if (productId && quantity > 0) {
      transaction.patch(productId, (patch) => patch.dec({ stock: quantity }));
    } else {
      console.warn(
        `Skipping stock decrement: missing productId or invalid quantity for line item in session ${id}`,
      );
    }
  }

  transaction.createOrReplace({
    _id: orderDocId,
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId:
      typeof payment_intent === "string" ? payment_intent : payment_intent?.id,
    stripeCustomerId,
    customerName,
    email: customerEmail,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : undefined,
    clerkUserId,
    currency,
    shippingAddress: shippingAddressData,
  });

  const result = await transaction.commit();
  return result;
}