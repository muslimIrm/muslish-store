"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loading from "@/components/Loading";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButton from "@/components/QuantityButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { urlFor } from "@/sanity/lib/image";
import { useCartStore } from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart, Loader2, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import paypal from "@/images/paypal.png";
import createCheckOutSession, {
  Metadata,
} from "@/actions/createCheckOutSession";
import ErrorDialog from "@/components/ErrorDialog";
const page = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  useEffect(() => setIsClient(true), []);
  if (!isClient) {
    return <Loading />;
  }
  const cartProduct = getGroupedItems();
  const handleResetCart = () => {
    const confirm = window.confirm("Are you sure to reset your Cart?");
    if (confirm) {
      resetCart();
      toast.success("Your Cart reset successfully!");
    }
  };
  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Delete product was successfully.");
  };

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName || "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress || "Unknown",
        clerkUserId: user!.id,
      };

      const result = await createCheckOutSession(cartProduct, metadata);

      if (result.success) {
        window.location.href = result.url;
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      console.error("Unexpected error creating checkout session:", error);
      setErrorMessage("Something unexpected happened. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 pb-52 md:pb-10">
      {isSignedIn ? (
        <Container>
          {cartProduct.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                {/* Products */}
                <div className="col-span-2 rounded-lg ">
                  <div className="border bg-white">
                    {cartProduct?.map(({ product }) => {
                      const itemCount = getItemCount(product?._id);
                      return (
                        <div
                          key={product?._id}
                          className="border-b last:border-b-0 flex items-center justify-between p-2.5 gap-5"
                        >
                          <div className="flex flex-1 items-center gap-2 h-36 max-h-38 md:h-44">
                            {product?.Images && (
                              <Link
                                href={`/products/${product?.slug?.current}`}
                                className="border p-0.5 overflow-hidden rounded-md md:p-1 mr-2 group"
                              >
                                <Image
                                  src={urlFor(product?.Images[0]).url()}
                                  width={500}
                                  height={500}
                                  alt="productImage"
                                  loading="lazy"
                                  className="w-32 md:w-40 h-32 md:h-40 object-cover overflow-hidden group-hover:scale-110 hoverEffect"
                                />
                              </Link>
                            )}
                            <div className="flex flex-col gap-4 items-start justify-between flex-1 h-full py-1">
                              <div className="space-y-1.5">
                                <h2 className="font-semibold line-clamp-1">
                                  {product?.name}
                                </h2>
                                <p className="text-sm text-lightColor font-medium max-sm:hidden">
                                  {product?.intro}
                                </p>
                                <p className=" capitalize text-sm">
                                  Variant:{" "}
                                  <span className="font-semibold">
                                    {product?.variant}
                                  </span>
                                </p>
                                <p className=" capitalize text-sm">
                                  Status:{" "}
                                  <span className="font-semibold">
                                    {product?.status}
                                  </span>
                                </p>
                              </div>
                              <div className="text-gray-500 flex items-center gap-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                    </TooltipTrigger>
                                    <TooltipContent className={"font-bold"}>
                                      Add To Favorite
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Trash
                                        onClick={() =>
                                          handleDeleteProduct(product?._id)
                                        }
                                        className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent
                                      className={"font-bold bg-red-600"}
                                    >
                                      Delete Product
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                            <div className="flex items-start justify-between flex-col h-36 md:h-44 p-0.5 md:p-1">
                              <PriceFormatter
                                amount={(product?.price as number) * itemCount}
                                className="font-bold text-lg"
                              />
                              <QuantityButton product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      variant={"destructive"}
                      onClick={handleResetCart}
                      className={"font-semibold m-5 rounded-md "}
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>
                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block rounded-lg p-6 bg-white w-full border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubtotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubtotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg text-darkColor font-bold"
                        />
                      </div>
                      <Button
                        onClick={handleCheckout}
                        disabled={loading}
                        size={"lg"}
                        className={
                          "w-full rounded-full font-semibold tracking-wide"
                        }
                      >
                        Proceed to Checkout
                        {loading && <Loader2 className=" animate-spin"/>}
                      </Button>
                      <Link
                        href={"/"}
                        className="w-full rounded-full border flex items-center justify-center py-2 border-darkColor/50 hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                      >
                        <Image className="w-20" src={paypal} alt="paypal" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Summary For Mobile */}
                <div className="md:hidden fixed bottom-0 left-0 w-full pt-2 bg-white">
                  <div className="p-4 rounded-lg border mx-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubtotalPrice()} />
                      </div>
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <PriceFormatter
                          amount={getSubtotalPrice() - getTotalPrice()}
                        />
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span>Total</span>
                        <PriceFormatter
                          amount={getTotalPrice()}
                          className="text-lg text-darkColor font-bold"
                        />
                      </div>
                      <Button
                        disabled={loading}
                        onClick={handleCheckout}
                        size={"lg"}
                        className={
                          "w-full rounded-full font-semibold tracking-wide"
                        }
                      >
                        Proceed to Checkout
                      </Button>
                      <Link
                        href={"/"}
                        className="w-full rounded-full border flex items-center justify-center py-2 border-darkColor/50 hover:border-darkColor hover:bg-darkColor/5 hoverEffect"
                      >
                        <Image className="w-20" src={paypal} alt="paypal" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
          {errorMessage && (
            <ErrorDialog
              message={errorMessage}
              open={!!errorMessage}
              onOpenChange={() => setErrorMessage(null)}
            />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default page;
