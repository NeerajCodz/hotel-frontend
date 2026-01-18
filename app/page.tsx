import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoGridSection } from "@/components/bento-grid";
import { FeaturedHotels } from "@/components/featured-hotels";
import { Newsletter } from "@/components/newsletter";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BentoGridSection />
      <FeaturedHotels />
      <Newsletter />
      <Footer />
    </main>
  );
}

