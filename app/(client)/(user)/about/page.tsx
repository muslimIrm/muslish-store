import Container from "@/components/Container";
import React from "react";

const AboutPage = () => {
  return (
    <Container className="max-w-6xl lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">About MUSLISH</h1>
      <p className="mb-4 text-gray-600 ">
        Welcome to MUSLISH Shop, your premier destination for streetwear and
        accessories that blend modern identity with innovative design. We focus
        on delivering unique pieces that represent your bold, independent
        lifestyle.
      </p>

      <p className="mb-4 text-gray-600 ">
        Founded to offer high-quality products at accessible prices, we pay
        close attention to every detail—from material selection to packaging and
        delivery—ensuring an exceptional shopping experience.
      </p>

      <p className="mb-4 text-gray-600 ">
        Our goal is to build a vibrant community that shares our passion for
        fashion and self-expression, continuously updating our collections to
        keep you ahead of the latest trends.
      </p>
    </Container>
  );
};

export default AboutPage;
