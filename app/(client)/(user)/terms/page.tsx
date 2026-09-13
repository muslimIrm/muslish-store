import React from "react";
import Container from "@/components/Container";
const TermsPage = () => {
  return (
    <Container className="max-w-3xl sm:px-4 lg:px-6 py-12">
      <h1 className="font-bold mb-6 text-3xl">Terms and Conditions</h1>

      <div className="flex flex-col gap-y-4">
        <section>
          <h2 className="font-bold mb-2 text-xl">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using MUSLISH Shop, you agree to comply with and be
            bound by these terms and conditions. If you do not agree, please do
            not use our services.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">2. Orders and Pricing</h2>
          <p className="text-gray-600">
            All product prices are subject to change without prior notice. We
            reserve the right to modify or cancel any order in case of pricing
            errors or inventory issues.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">3. Shipping and Delivery</h2>
          <p className="text-gray-600">
            Delivery times are estimated and may vary based on your location.
            MUSLISH Shop is not liable for delays caused by third-party shipping
            carriers or customs processes.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">
            4. Return and Refund Policy
          </h2>
          <p className="text-gray-600">
            Items can be returned within 14 days of delivery, provided they are
            unused and in their original packaging. Return shipping costs are
            the responsibility of the customer.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">5. Intellectual Property</h2>
          <p className="text-gray-600">
            All content, logos, graphics, and product designs on this site are
            the exclusive property of MUSLISH Shop and are protected by
            applicable copyright laws.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default TermsPage;
