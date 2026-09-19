"use server";
import { stripe } from "@/lib/stripe";
import { Product } from "@/sanity.types";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
}

interface itemsCart {
  product: CartItem["product"];
  quantity: number;
}

// Discriminated union: TypeScript forces you to check `success`
// before accessing `url` or `error`, preventing mix-ups between the two.
type CheckoutResult =
  | { success: true; url: string }
  | { success: false; error: string };

export default async function createCheckOutSession(
  items: itemsCart[],
  metadata: Metadata,
): Promise<CheckoutResult> {
  try {
    for (const item of items) {
      const slug = item?.product?.slug?.current;

      if (!slug) {
        return {
          success: false,
          error: `Could not find product data for "${item?.product?.name ?? "this item"}".`,
        };
      }

      const freshProduct: Product = (await getProductBySlug(slug)) as Product;
      const availableStock = freshProduct?.stock ?? 0;

      if (!freshProduct || availableStock < item.quantity) {
        return {
          success: false,
          error: `Sorry, "${item?.product?.name ?? "this product"}" no longer has enough stock available.`,
        };
      }
    }

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
      },
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "SA",
          "AE",
          "EG",
          "KW",
          "BH",
          "QA",
          "OM",
        ],
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.Images && item.product.Images.length > 0
                ? [urlFor(item.product.Images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      })),
    };

    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    if (!session.url) {
      return {
        success: false,
        error: "Could not generate a checkout link. Please try again.",
      };
    }

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      success: false,
      error: "Something went wrong while creating your checkout session. Please try again.",
    };
  }
}