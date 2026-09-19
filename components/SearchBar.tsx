"use client";
import { Loader2, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import ErrorFetchingProducts from "./ErrorFetchingProduct";
import PaginatedButton from "./PaginatedButton";
import { searchProducts } from "@/sanity/helpers/queries";

const PAGE_SIZE = 10;

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState<{ status: boolean; message: string }>({
    status: false,
    message: "",
  });

  const fetchProducts = useCallback(async () => {
    if (!debouncedSearch) {
      setProducts([]);
      setTotalPages(1);
      setIsError({ status: false, message: "" });
      return;
    }

    setLoading(true);
    setIsError({ status: false, message: "" });
    try {
      const response = await searchProducts({
        search: debouncedSearch,
        page,
        pageSize: PAGE_SIZE,
      });
      setProducts(response.products);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "There was an error, please try again.";
      setIsError({ status: true, message: errorMessage });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  // Debounce: only update `debouncedSearch` (and reset to page 1) after typing pauses.
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  // Actual fetch runs only when the debounced term or the page changes.
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>
      <DialogContent className=" max-w-5xl! flex flex-col h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="mb-1">Product SearchBar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-md py-5"
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="absolute top-3 right-11 w-4 h-4 hover:text-red-600 hoverEffect"
              />
            )}
            <button
              type="submit"
              className={`absolute top-0 right-0 w-10 h-full flex items-center justify-center rounded-r-md hover:text-white hover:bg-darkColor transition-colors ${search ? "bg-darkColor text-white" : "bg-darkColor/10 text-darkColor"}`}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full border border-darkColor/20 rounded-md overflow-y-scroll">
          {loading ? (
            <p className="flex items-center px-6 py-10 font-semibold text-yellow-500 gap-1 text-center">
              <Loader2 className="w-5 h-5 animate-spin" />
              Searching on progress
            </p>
          ) : isError.status ? (
            <ErrorFetchingProducts
              errorMessage={isError.message}
              onRetry={() => fetchProducts()}
              className="mt-0 h-full"
            />
          ) : products.length > 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex-1">
                {products.map((product: Product) => (
                  <div
                    key={product?._id}
                    className="bg-white overflow-hidden border-b last:border-b-0"
                  >
                    <div className="flex items-center p-1">
                      <Link
                        href={`/products/${product?.slug?.current}`}
                        className="w-20 h-20 md:w-24 md:h-24 shrink-0 border border-darkColor/20 rounded-md group"
                        onClick={() => setShowSearch(false)}
                      >
                        {product?.Images && (
                          <Image
                            src={urlFor(product?.Images[0])?.url()}
                            width={200}
                            height={200}
                            alt="ProductImage"
                            className={`w-full h-full object-cover hoverEffect group-hover:scale-105`}
                          />
                        )}
                      </Link>
                      <div className="px-4 py-2 grow">
                        <Link
                          href={`/products/${product?.slug?.current}`}
                          onClick={() => setShowSearch(false)}
                        >
                          <h3 className="text-sm lg:text-lg text-gray-800 line-clamp-1">
                            {product?.name}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {product?.intro}
                          </p>
                        </Link>
                        <PriceView
                          price={product?.price}
                          discount={product?.discount}
                          className="md:text-lg"
                        />
                      </div>
                      <div className="w-60! mt-1 flex">
                        <AddToCartButton product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaginatedButton
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            </div>
          ) : (
            <div className="text-center py-10 font-semibold tracking-wide px-2">
              {debouncedSearch ? (
                <p>
                  Nothing Matching with keyword{" "}
                  <span className="underline text-red-500">
                    {debouncedSearch}.
                  </span>{" "}
                  Please try something else.
                </p>
              ) : (
                <p className="text-green-600 flex items-center justify-center gap-1">
                  <Search className="w-5 h-5" /> Search & Explore products
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
