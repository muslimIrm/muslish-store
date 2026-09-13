"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store";
import toast from "react-hot-toast";
interface Props {
  product: Product;
  className?: string;
}

const QuantityButton = ({ product, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;
  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      <Button
        variant={"outline"}
        disabled={itemCount === 0 || isOutOfStock}
        size={"icon"}
        className={"w-6 h-6"}
        onClick={() => {
          removeItem(product?._id);
          if (itemCount > 1) {
            toast.success("Quantity Decreased Successfully.");
          } else{
            toast.success(`${product?.name?.substring(0,12)}... removed successfully.`)
          }
        }}
      >
        <Minus />
      </Button>
      <span className="text-darkColor font-semibold w-8 text-center">
        {itemCount}
      </span>
      <Button
        variant={"outline"}
        size={"icon"}
        disabled={itemCount === 0 || isOutOfStock}
        className={"w-6 h-6"}
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}... added successfully.`,
          );
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButton;
