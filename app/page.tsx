import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import ServicesSection from "@/components/home/ServicesSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutPreview from "@/components/home/AboutPreview";
import CTASection from "@/components/home/CTASection";
import VideoSection from "@/components/home/VideoSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <FeaturesStrip />
        <ServicesSection />
        <AboutPreview />
        <VideoSection />
        <GallerySection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
