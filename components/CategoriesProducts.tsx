"use client";
import { CATEGORIES_QUERY_RESULT, Product } from "@/sanity.types";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import ErrorFetchingProducts from "./ErrorFetchingProduct";
import PaginatedButton from "./PaginatedButton";
import { getProductsByCategories } from "@/sanity/helpers/queries";

interface Props {
  categories: CATEGORIES_QUERY_RESULT;
  slug: string;
}

const PAGE_SIZE = 10;

const CategoriesProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  // Start as `true`: we fetch immediately on mount, so the UI should show
  // the loading state right away instead of briefly flashing "No Products".
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState<string>("");

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    setIsError("");
    try {
      const response = await getProductsByCategories({
        category: categorySlug,
        page,
        pageSize: PAGE_SIZE,
      });
      setProducts((response?.products as Product[]) ?? []);
      setTotalPages(response?.totalPages ?? 1);
    } catch (e) {
      console.error("Error fetching products:", e);
      const errorMessage =
        typeof e === "string"
          ? e
          : e instanceof Error
            ? e.message
            : "There was an error, please try again.";

      setIsError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newSlug: string) => {
    setCurrentSlug(newSlug);
    setPage(1);
  };

  useEffect(() => {
    if (currentSlug) {
      fetchProducts(currentSlug);
    }
  }, [currentSlug, page]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`border-0 bg-transparent rounded-none text-darkColor shadow-none hover:bg-darkColor hover:text-white hoverEffect border-b border-b-gray-200 last:border-b-0 ${item?.slug?.current === currentSlug && "bg-darkColor text-white"}`}
          >
            {item?.title}
          </Button>
        ))}
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 w-full rounded-lg w-full">
            <div className="flex items-center justify-center gap-x-2 text-blue-600">
              <Loader2 className="animate-spin" />
              <span className="text-lg font-semibold">
                Products is Loading...
              </span>
            </div>
          </div>
        ) : (
          <>
            {!!isError ? (
              <ErrorFetchingProducts
                errorMessage={isError}
                onRetry={() => fetchProducts(currentSlug)}
              />
            ) : products.length ? (
              <div className="flex flex-col gap-3">
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
                <PaginatedButton
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </div>
            ) : (
              <NoProductsAvailable
                selectedTab={currentSlug}
                className="mt-0 w-full"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesProducts;
