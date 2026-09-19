"use server";
import { ContentSourceMap, defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";
import { QueryParams } from "sanity";
import { Product } from "@/sanity.types";
import { client } from "../lib/client";

interface ResponseType {
  data: any;
  sourceMap: ContentSourceMap | null;
  tags: string[];
}

// Generic, safe message shown to the user for unexpected data-fetching failures.
// Never expose raw GROQ/DB error text here.
const GENERIC_FETCH_ERROR =
  "We couldn't load this content right now. Please try again.";

export const getProductsByVariant = async ({
  selectedTab,
  page,
  pageSize,
}: {
  selectedTab: string;
  page: number;
  pageSize: number;
}) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const PRODUCTS_BY_VARIANT_QUERY = defineQuery(
    `{
      "products": *[_type == "product" && variant == $variant] | order(name asc) [$start...$end],
      "total": count(*[_type == "product" && variant == $variant])
    }`,
  );
  const params: QueryParams = {
    variant: selectedTab,
    start,
    end,
  };
  try {
    const response = await client.fetch(PRODUCTS_BY_VARIANT_QUERY, params, {
      next: { revalidate: 60 },
    });

    const products = (response?.products as Product[]) || [];
    const total = response?.total || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      products,
      total,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products by variant:", error);
    throw new Error(GENERIC_FETCH_ERROR);
  }
};

export const getProductsByCategories = async ({
  category,
  page,
  pageSize,
}: {
  category: string;
  page: number;
  pageSize: number;
}) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
    `{
      "products": *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc) [$start...$end],
      "total": count(*[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)])
    }`,
  );

  const params: QueryParams = {
    categorySlug: category,
    start,
    end,
  };
  try {
    const response = await client.fetch(PRODUCTS_BY_CATEGORY_QUERY, params, {
      next: { revalidate: 60 },
    });

    const products = (response?.products as Product[]) || [];
    const total = response?.total || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      products,
      total,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error(GENERIC_FETCH_ERROR);
  }
};

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == "product" && slug.current == $slug][0]`,
  );
  try {
    const product = await client.fetch(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { cache: "no-store" },
    );

    return (product as Product) || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};
export const GetAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type == "category"] | order(name asc)`,
  );
  try {
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });

    return categories?.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};

export const getAllOrders = async () => {
  const ALL_ORDERS_QUERY = defineQuery(
    `*[_type == "order"] | order(orderDate desc){
      ...,
      products[]{
      ...,
      product->
    }
    }`,
  );
  try {
    console.log("HHH");
    const orders = await client.fetch(
      ALL_ORDERS_QUERY,
      {},
      { cache: "no-store" },
    );
    console.log(orders);
    return orders || [];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    console.error("getMyOrders called without a userId.");
    // Same reasoning as above: keep the return type consistent (Order[]),
    // never mix in an Error object.
    return [];
  }

  const MY_ORDERS_QUERY = defineQuery(
    `*[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
      ...,
      products[]{
      ...,
      product->
    }
    }`,
  );
  try {
    const orders = await client.fetch(
      MY_ORDERS_QUERY,
      { userId },
      { cache: "no-store" },
    );
    return orders || [];
  } catch (error) {
    console.error("Error fetching my orders:", error);
    return [];
  }
};

export const searchProducts = async ({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const SEARCH_PRODUCTS_QUERY = defineQuery(
    `{
      "products": *[_type == "product" && name match $search] | order(name asc) [$start...$end],
      "total": count(*[_type == "product" && name match $search])
    }`,
  );

  const params: QueryParams = {
    search: `${search}*`,
    start,
    end,
  };

  try {
    const response = await client.fetch(SEARCH_PRODUCTS_QUERY, params, {
      next: { revalidate: 60 },
    });

    const products = (response?.products as Product[]) || [];
    const total = response?.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      products,
      total,
      totalPages,
    };
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error(GENERIC_FETCH_ERROR);
  }
};
