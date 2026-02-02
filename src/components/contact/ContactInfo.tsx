import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactInfo() {
    return (
        <div>
            <h2 className="text-primary mt-0 mb-10">Get in Touch</h2>
            <div className="space-y-8">
                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-1">Email Us</h4>
                        <p className="text-gray-600">hello@nepglass.com.np</p>
                        <p className="text-gray-600">support@nepglass.com.np</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-1">Call Us</h4>
                        <p className="text-gray-600">+977-1-4XXXXXX</p>
                        <p className="text-gray-600">+977-98XXXXXXXX</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-1">Visit Us</h4>
                        <p className="text-gray-600">Kathmandu, Nepal</p>
                        <p className="text-gray-600">Durbarmarg Branch / New Road Branch</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
