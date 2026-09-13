"use client";
import { CATEGORIES_QUERY_RESULT, Product } from "@/sanity.types";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { client } from "@/sanity/lib/client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
interface Props {
  categories: CATEGORIES_QUERY_RESULT;
  slug: string;
}
const CategoriesProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Complexity is 3 Everything is cool!
  const fetchProducts = async (categorySlug: string) => {
    try {
      setLoading(true);
      const query = `*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)`;
      const products = await client.fetch(query, { categorySlug });
      setProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentSlug) {
      fetchProducts(currentSlug);
    }
  }, [currentSlug]);
  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            onClick={() => setCurrentSlug(item?.slug?.current as string)}
            key={item?._id}
            className={`border-0 bg-transparent rounded-none text-darkColor shadow-none hover:bg-darkColor hover:text-white hoverEffect border-b border-b-gray-200 last:border-b-0 ${item?.slug?.current === currentSlug && "bg-darkColor text-white"}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <div className="flex-1 ">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 w-full rounded-lg ">
            <div className="flex items-center justify-center gap-x-2 text-blue-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Products is Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {products.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  w-full">
                {products?.map((product: Product) => (
                  <AnimatePresence key={product?._id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>
            ) : (
              <NoProductsAvailable selectedTab={currentSlug} className="mt-0 w-full"/>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesProducts;
