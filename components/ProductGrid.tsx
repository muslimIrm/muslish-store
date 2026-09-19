"use client";
import React, { useEffect, useState } from "react";
import HomeTabbar from "./HomeTabbar";
import { ProductType } from "@/constants";
import { client } from "@/sanity/lib/client";
import { QueryParams } from "sanity";
import ProductCard from "./ProductCard";
import NoProductsAvailable from "./NoProductsAvailable";
import { Product } from "@/sanity.types";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import PaginatedButton from "./PaginatedButton";
import { getProductsByVariant } from "@/sanity/helpers/queries";
import ErrorFetchingProducts from "./ErrorFetchingProduct";

interface Params {
  selectedTab: string;
  pageSize: number;
  initial: boolean;
  lastName?: string;
}

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(ProductType[0]?.title || "");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(2);
  const [isError, setIsError] = useState<string>("");
  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  const fetchData = async () => {
    console.log(page);
    setLoading(true);
    setIsError("");
    try {
      const response = await getProductsByVariant({
        selectedTab: selectedTab.toLowerCase(),
        page,
        pageSize,
      });
      response && setProducts(response.products as Product[]);
      response && setTotalPages(response?.totalPages);
    } catch (e) {
      console.log("product fetching Error", e);
      const errorMessage =
        typeof e === "string"
          ? e
          : e instanceof Error
            ? e.message
            : "there was something error, try again.";

      setIsError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedTab, page]);
  return (
    <div className="mt-10 flex flex-col items-center justify-center w-full">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col flex-1 items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 w-full rounded-lg mt-10">
          <div className="flex items-center justify-center gap-x-2 text-blue-600 w-full">
            <Loader2 className="animate-spin" />
            <span className="text-lg font-semibold">
              Products is Loading...
            </span>
          </div>
        </div>
      ) : !!isError ? (
        <ErrorFetchingProducts
          errorMessage={isError}
          onRetry={fetchData}
        />
      ) : products.length ? (
        <div className="flex flex-col space-y-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
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
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      ) : (
        <NoProductsAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
