import { Product } from "@/sanity.types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const ProductCharacteristics = ({ product }: { product: Product }) => {
  return (
    <Accordion >
      <AccordionItem value={"item-1"}>
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          <p className="flex justify-between items-center">
            Brand: <span className="font-semibold tracking-wide">Unknown</span>
          </p>
          <p className="flex justify-between items-center">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2024</span>
          </p>
          <p className="flex justify-between items-center">
            Type:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex justify-between items-center">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
          <p className="flex justify-between items-center">
            Intro:{" "}
            <span className="font-semibold tracking-wide">
              {product?.intro}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
