import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import ProductionSection from "@/components/ProductionSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BigTopSocial | Creative & Digital Marketing Agency",
  description: "Welcome to BigTopSocial - Your partner in creative excellence and digital transformation. We offer social media marketing, branding, content creation, and innovative digital solutions.",
  keywords: [
    "digital marketing",
    "social media agency",
    "creative agency",
    "brand development",
    "content marketing",
    "digital solutions",
    "marketing services",
    "creative services"
  ],
  openGraph: {
    title: "BigTopSocial - Creative & Digital Marketing Agency",
    description: "Transform your brand with cutting-edge creative and digital marketing solutions.",
    url: "https://bigtopsocial.com",
    type: "website",
  },
};

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
