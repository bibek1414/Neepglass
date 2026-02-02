import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="pb-20">
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Terms & Conditions</h1>
          <p className="text-gray-600 mt-4 italic">Last updated: February 1, 2025</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-primary">1. Agreement to Terms</h2>
          <p className="mb-8 text-gray-600">
            By accessing or using the NepGlass website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our website.
          </p>

          <h2 className="text-primary">2. Products and Services</h2>
          <p className="mb-8 text-gray-600">
            We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
          </p>

          <h2 className="text-primary">3. Purchases and Payment</h2>
          <p className="mb-8 text-gray-600">
            We accept various forms of payment, including Cash on Delivery (COD) and local digital wallets. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
          </p>

          <h2 className="text-primary">4. Prescription Lenses</h2>
          <p className="mb-8 text-gray-600">
            By ordering prescription lenses, you represent that you have a valid prescription from a licensed optometrist or ophthalmologist. You are responsible for providing the correct prescription information.
          </p>
        </div>
      </section>
    </div>
  );
}
