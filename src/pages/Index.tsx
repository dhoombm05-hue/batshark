import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <TestimonialsSection />
      <StatsSection />
      <AboutSection />
      <PricingSection />
      <FAQSection />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
