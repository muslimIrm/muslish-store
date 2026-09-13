import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const ContactPage = () => {
  return (
    <Container className="max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact us</h1>
      <p className="mb-6 text-gray-600">
        Have questions or need assistance? Reach out to our team at MUSLISH
        Shop—we're here to help you with your orders, inquiries, or feedback!
      </p>
      <form className="space-y-4!">
        <div className="flex gap-y-0.5 flex-col">
          <label htmlFor="name">Name</label>
          <Input
            name="name"
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex gap-y-0.5 flex-col">
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex gap-y-0.5 flex-col">
          <label htmlFor="message">Message</label>
          <Textarea
            name="message"
            id="message"
            rows={6}
            cols={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
            required
          />
        </div>
        <Button
          type="submit"
          className={
            "py-5 px-6 text-sm font-semibold bg-darkColor/80 hover:bg-darkColor rounded-md hoverEffect"
          }
        >
          Send Message
        </Button>
      </form>
    </Container>
  );
};

export default ContactPage;
