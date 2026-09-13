"use client";
import { useCartStore } from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { items } = useCartStore();
  return (
    <Link href={"/cart"} className={"group relative"}>
      <ShoppingBag
        className={"group-hover:text-darkColor hoverEffect w-5 h-5"}
      />
      <span
        className={
          " absolute -top-1 -right-1 text-white bg-darkColor w-3.5 h-3.5 rounded-full flex items-center justify-center font-semibold text-xs"
        }
      >
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
