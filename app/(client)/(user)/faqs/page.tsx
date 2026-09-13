import Container from "@/components/Container";
import Title from "@/components/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQsData } from "@/constants";
import React from "react";

const FaqsPage = () => {
  return (
    <Container className="max-w-4xl sm:px-6 lg:px-8 py-12">
      <Title className="text-3xl">Questions & Answers</Title>
      <Accordion className={"w-full"} defaultValue={["item-0"]}>
        {FAQsData?.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className={"group"}>
            <AccordionTrigger className={"text-lg font-semibold text-darkColor/80 group-hover:text-darkColor group-hover:no-underline! hoverEffect"}>{faq?.question}</AccordionTrigger>
            <AccordionContent className={"text-gray-600"}>{faq?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FaqsPage;
