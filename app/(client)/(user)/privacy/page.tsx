import Container from "@/components/Container";
import React from "react";

const PrivacyPage = () => {
  return (
    <Container className="max-w-3xl sm:px-4 lg:px-6 py-12">
      <h1 className="font-bold mb-6 text-3xl">Privacy Policy</h1>

      <div className="flex flex-col gap-y-4">
        <section>
          <h2 className="font-bold mb-2 text-xl">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect personal information that you provide to us when placing
            an order, creating an account, or contacting us, including your
            name, email address, shipping address, and payment details.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600">
            Your information is used to process orders, manage your account,
            improve our services, and communicate with you regarding order
            updates, promotional offers, and news from MUSLISH Shop.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">
            3. Data Protection and Security
          </h2>
          <p className="text-gray-600">
            We implement strict security measures to ensure the protection of
            your personal data. All payment transactions are encrypted using
            secure socket layer technology (SSL).
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">4. Third-Party Sharing</h2>
          <p className="text-gray-600">
            We do not sell, trade, or rent your personal information to third
            parties. We only share necessary data with trusted service providers
            who assist us in operating our site and delivering your packages.
          </p>
        </section>

        <section>
          <h2 className="font-bold mb-2 text-xl">5. Cookies and Tracking</h2>
          <p className="text-gray-600">
            We use cookies to enhance your browsing experience, analyze site
            traffic, and remember your shopping cart items. You can choose to
            disable cookies through your browser settings at any time.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default PrivacyPage;
