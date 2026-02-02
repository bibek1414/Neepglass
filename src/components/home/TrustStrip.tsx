import { ShieldCheck, Truck, RotateCcw, Eye } from 'lucide-react';

const items = [
    {
        icon: <Eye className="w-6 h-6 text-secondary" />,
        title: 'Free Eye Test',
        desc: 'Available at partner clinics',
    },
    {
        icon: <Truck className="w-6 h-6 text-secondary" />,
        title: 'Fast Delivery',
        desc: 'Across Nepal',
    },
    {
        icon: <RotateCcw className="w-6 h-6 text-secondary" />,
        title: '7-Day Returns',
        desc: 'Hassle-free',
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-secondary" />,
        title: 'Warranty',
        desc: 'On frames & lenses',
    },
];

export default function TrustStrip() {
    return (
        <section className="bg-white border-y border-gray-100 py-6">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 transition-all cursor-default"
                    >
                        <div className="mb-2">{item.icon}</div>
                        <p className="text-sm font-semibold text-primary">{item.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
