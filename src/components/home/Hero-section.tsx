import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="relative bg-white min-h-[calc(100vh-64px)] md:min-h-[80vh] flex items-center py-8 md:py-16">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">

                {/* Text */}
                <div className="py-6 md:py-10 order-2 md:order-1">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl text-primary leading-tight mb-4 md:mb-5 font-bold">
                        Premium Eyewear
                        <br />
                        <span className="text-secondary">Made for Nepal</span>
                    </h1>

                    <p className="text-sm md:text-lg text-gray-600 max-w-md leading-relaxed mb-6 md:mb-8">
                        Thoughtfully designed eyewear that blends comfort, clarity, and
                        modern style for everyday life.
                    </p>

                    <div className="flex gap-3 md:gap-4">
                        <Link href="/products">
                            <Button size="lg" className="rounded-full w-full md:w-auto text-sm md:text-base px-6 md:px-8">
                                Explore Collection
                            </Button>
                        </Link>

                        <Link href="/about">
                            <Button variant="outline" size="lg" className="rounded-full w-full md:w-auto text-sm md:text-base px-6 md:px-8">
                                Our Story
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="relative order-1 md:order-2">
                    <div className="absolute -top-16 -right-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl hidden md:block" />
                    <img
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
                        alt="NepGlass Premium Sunglasses"
                        className="w-full aspect-[4/3] md:aspect-[4/5] object-cover rounded-2xl md:rounded-3xl shadow-sm md:shadow-none"
                    />
                </div>
            </div>
        </section>
    );
}
