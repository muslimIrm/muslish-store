import Container from "@/components/Container";
import { GetAllCategories } from "@/sanity/helpers/queries";
import Title from "@/components/Title";
import React from "react";
import CategoriesProducts from "@/components/CategoriesProducts";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const categories = await GetAllCategories();
  return (
    <Container className="py-10">
      <Title className="text-3xl">
        Product By Categories: {" "}
        <span className="font-bold text-green-600 capitalize tracking-wide">
          {slug && slug}
        </span>
      </Title>
      <CategoriesProducts categories={categories} slug={slug}/>
    </Container>
  );
};

export default page;
