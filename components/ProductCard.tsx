import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  console.log(product);
  return (
    <div className="rounded-lg group text-sm overflow-hidden h-full flex flex-col">
      {/* الصورة: ارتفاع ثابت، لا تتمدد */}
      <div className="bg-linear-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative shrink-0">
        {product?.Images && (
          <Link href={`/products/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.Images[0])?.url()}
              width={500}
              height={500}
              alt="ProductImage"
              priority
              className={`w-full h-72 object-contain overflow-hidden hoverEffect ${product?.stock && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="bg-darkColor/40 absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <p className="text-base text-white text-center">Out Of Stock</p>
          </div>
        )}
      </div>

      {/* القسم النصي: يأخذ كل المساحة المتبقية */}
      <div className="py-3 px-2 flex flex-col gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none flex-1">
        <h2 className="font-semibold line-clamp-1">{product?.name}</h2>
        <p className="line-clamp-2">{product?.intro}</p>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-lg"
        />
        <AddToCartButton product={product}/>
      </div>
    </div>
  );
};

export default ProductCard;
