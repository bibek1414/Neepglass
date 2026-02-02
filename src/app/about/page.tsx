import React from 'react';

export default function AboutPage() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="bg-gray-50 pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-primary max-w-2xl">Our Vision for Better Vision in Nepal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mt-6">
            At NepGlass, we see eyewear as more than just a visual aid — it’s a statement of style, comfort, and confidence.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-custom grid md:grid-cols-2 gap-20 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
              alt="Craftsmanship"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <div>
              <h2 className="text-primary mt-0">Why NepGlass?</h2>
              <p className="text-gray-600 mb-6">
              At NepGlass, we see eyewear as more than just a visual aid — it&apos;s a statement of style, comfort, and confidence. Based in Nepal, we specialize in premium lens solutions, stylish frames, and trendsetting sunglasses that elevate everyday look and protect your vision.
              </p>
              <p className="text-gray-600 mb-6">
              We combine quality craftsmanship with modern aesthetics, offering a curated selection of products suited for every face, lifestyle, and budget. Whether you&apos;re updating your prescription lenses, choosing a classic frame, or picking out polarized sunglasses for sunny days, NepGlass makes the experience seamless and personal.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="font-medium text-primary">Stylish & Versatile Selection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="font-medium text-primary">Vision First: High-quality lenses</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span className="font-medium text-primary">Made for Nepal: Local preferences</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span className="font-medium text-primary">Personalized Service: Expert guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-white mt-0">Our Philosophy</h2>
          <p className="text-lg text-gray-300 italic">
            &quot;Your vision and style come first. See clearer. Look sharper. Live brighter.&quot;
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-secondary text-4xl font-bold mb-2">10k+</h3>
              <p className="text-sm text-gray-400">Happy Eyes</p>
            </div>
            <div>
              <h3 className="text-secondary text-4xl font-bold mb-2">500+</h3>
              <p className="text-sm text-gray-400">Frames Collection</p>
            </div>
            <div>
              <h3 className="text-secondary text-4xl font-bold mb-2">100%</h3>
              <p className="text-sm text-gray-400">UV Protection</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
