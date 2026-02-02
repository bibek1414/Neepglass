import React from 'react';

export default function ShippingAndReturns() {
  return (
    <div className="pb-20">
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Shipping & Returns</h1>
          <p className="text-gray-600 mt-4 italic">Everything you need to know about delivery and exchanges.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          <h2 className="text-primary">Shipping Policy</h2>
          <div className="space-y-6 text-gray-600 mb-16">
            <p>We provide shipping across all major cities and towns in Nepal.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Inside Kathmandu Valley:</strong> 24-48 hours. Shipping is FREE for orders above Rs. 2,000.</li>
              <li><strong>Outside Kathmandu Valley:</strong> 3-5 business days. Flat rate of Rs. 150.</li>
            </ul>
            <p>Once your order is shipped, you will receive a tracking ID via SMS/Email.</p>
          </div>

          <h2 className="text-primary">Returns & Exchanges</h2>
          <div className="space-y-6 text-gray-600">
            <p>We want you to be completely satisfied with your NepGlass purchase. If you are not happy, you can return or exchange your item within 7 days of delivery.</p>
            <h3 className="text-primary font-bold text-lg mt-6">Conditions for Returns:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Items must be in original, unused condition.</li>
              <li>All original packaging, cases, and cloths must be included.</li>
              <li>Prescription lenses are custom-made and <strong>cannot</strong> be returned unless there is a manufacturing error.</li>
            </ul>
            <p>To initiate a return, please contact our support team at support@nepglass.com.np or call us at our store.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
