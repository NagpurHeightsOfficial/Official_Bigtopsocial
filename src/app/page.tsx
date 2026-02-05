import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ProductionSection from "@/components/ProductionSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ProductionSection />
      
      
      <ContactSection />
      <ClientsSection />
      <Footer />
    </main>
  );
}
