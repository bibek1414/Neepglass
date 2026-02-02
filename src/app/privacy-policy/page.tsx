import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="pb-20">
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Privacy Policy</h1>
          <p className="text-gray-600 mt-4 italic">Last updated: February 1, 2025</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl prose prose-slate">
          <h2 className="text-primary">Introduction</h2>
          <p>
            At NepGlass, we value your privacy and are committed to protecting your personal data. This privacy policy will inform you how we handle your personal data when you visit our website.
          </p>

          <h3 className="text-primary mt-8">Data We Collect</h3>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul>
            <li>Identity Data (Name, username)</li>
            <li>Contact Data (Email, phone number, delivery address)</li>
            <li>Transaction Data (Details about payments to and from you)</li>
            <li>Technical Data (IP address, browser type and version)</li>
          </ul>

          <h3 className="text-primary mt-8">How We Use Your Data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>To process and deliver your order.</li>
            <li>To manage our relationship with you.</li>
            <li>To improve our website, products/services, marketing and customer relationships.</li>
          </ul>

          <h3 className="text-primary mt-8">Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@nepglass.com.np
          </p>
        </div>
      </section>
    </div>
  );
}
