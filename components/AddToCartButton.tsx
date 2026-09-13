"use client"
import { Button } from "./ui/button";
import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
import { useCartStore } from "@/store";
import toast from "react-hot-toast"
interface Props {
  product: Product;
  className?: string;
}
const AddToCartButton = ({ product, className }: Props) => {
  const {addItem, getItemCount} = useCartStore()
  const isOutStock = product?.stock === 0;
  console.log(isOutStock)
  let itemCount = getItemCount(product._id);
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount !== 0 ? (
        <div className="w-full text-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButton product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          disabled={isOutStock}
          onClick={()=>{
            addItem(product);
            toast.success(`${product?.name?.substring(0, 12)}... added successfully.`)
          }}
          className={cn(
            "w-full bg-transparent py-5 shadow-none text-darkColor font-semibold border border-darkColor/30 hover:text-white hoverEffect tracking-wide",
            className,
          )}
        >
          Add To Cart
        </Button>
        
      )}
    </div>
  );
};

export default AddToCartButton;
