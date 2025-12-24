import ImageWithFallback
 from "@/components/common/ImageWithFallback";
 import { getImageUrl } from "@/config/site";
const HomePage: React.FC = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white text-center px-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
          Nepdora
        </h1>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
          Build Your Free Website Now
        </h2>
          <ImageWithFallback
                      src={getImageUrl("/random-pictures-MR0G79.jpg")}
                      fallbackSrc="/random-pictures-MR0G79.jpg"
                      alt="random-images"
                     height={80}
                     width={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
      </div>
    </section>
  );
};

export default HomePage;
