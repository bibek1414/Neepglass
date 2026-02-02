import React from 'react';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { constructMetadata } from '@/config/metadata';

export const metadata = constructMetadata({
  title: 'Contact Us | NepGlass',
  description: 'Get in touch with NepGlass for inquiries about our premium eyewear and lens solutions.',
});

export default function ContactPage() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mt-6">
            Have questions about our products or need help with your prescription?
            Our experts are here to help.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-20">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
