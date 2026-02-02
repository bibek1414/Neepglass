import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
    return (
        <section className="relative bg-white min-h-[80vh] flex items-center py-12 md:py-16">
            <div className="container-custom grid md:grid-cols-2 gap-10 items-center">

                {/* Text */}
                <div className="py-10">
                    <h1 className="text-4xl md:text-6xl text-primary leading-tight mb-5">
                        Premium Eyewear
                        <br />
                        <span className="text-secondary">Made for Nepal</span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-600 max-w-md leading-relaxed mb-8">
                        Thoughtfully designed eyewear that blends comfort, clarity, and
                        modern style for everyday life.
                    </p>

                    <div className="flex gap-4">
                        <Link href="/products">
                            <Button size="lg" className="rounded-full">
                                Explore Collection
                            </Button>
                        </Link>

                        <Link href="/about">
                            <Button variant="outline" size="lg" className="rounded-full">
                                Our Story
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="relative hidden md:block">
                    <div className="absolute -top-16 -right-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
                    <img
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
                        alt="NepGlass Premium Sunglasses"
                        className="w-full aspect-[4/5] object-cover rounded-3xl"
                    />
                </div>
            </div>
        </section>
    );
}
