import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import ImageViewer from "@/components/ImageViewer";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import PriceView from "@/components/PriceView";
import { Product } from "@/sanity.types";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { BoxIcon, FileQuestion, Heart, ListOrderedIcon, Share } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

const items = [
  {
    icon: <BoxIcon className="w-5 h-5" />,
    title: "Compare Colors",
  },
  {
    icon: <FileQuestion className="w-5 h-5" />,
    title: "Ask a Question",
  },
  {
    icon: <ListOrderedIcon className="w-5 h-5" />,
    title: "Delivery & Returns",
  },
  {
    icon: <Share className="w-5 h-5" />,
    title: "Share",
  },
];
const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  let product: Product | null = null;
  if (data) {
    product = data as Product;
  }
  if (!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col py-10 md:flex-row gap-10">
      {product.Images && <ImageViewer images={product.Images} />}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div>
          <h2 className={"text-3xl font-bold mb-2 md:text-4xl"}>
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className={"text-lg font-bold"}
          />
        </div>
        {product?.stock && (
          <p
            className={
              "bg-green-100 text-green-600 text-sm font-semibold w-24 text-center py-2.5 rounded-lg"
            }
          >
            In Stock
          </p>
        )}
        {product?.description && (
          <p className={"text-sm text-gray-600 tracking-wide"}>
            {product?.description}
          </p>
        )}
        <div className={"flex items-center gap-2.5 lg:gap-5 w-full"}>
          <AddToCartButton
            product={product}
            className={
              "bg-darkColor/80 w-full text-white hover:bg-darkColor hoverEffect"
            }
          />
          <button className=" border-2 border-darkColor/30 text-darkColor/60 px-2.5 py-1.5 hover:text-darkColor hover:border-darkColor hoverEffect rounded-md">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        {/* <ProductCharacteristics product={JSON.parse(JSON.stringify(product))} /> */}
        <ProductCharacteristics product={product}/>
        <div className="flex items-center  justify-between gap-2.5 flex-wrap border-b border-gray-200 -mt-2 py-5">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-darkColor hover:text-red-600 cursor-pointer hoverEFfect">
              {item.icon}
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEFfect">
            <p className="text-base font-semibold text-darkColor">
              Free Shipping
            </p>
            <p className="text-sm text-gray-500">
              Free Shipping over order $100
            </p>
          </div>
          <div className="border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEFfect">
            <p className="text-base font-semibold text-darkColor">
              Flexible Payment
            </p>
            <p className="text-sm text-gray-500">
              Pay with multiple credit cards
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
