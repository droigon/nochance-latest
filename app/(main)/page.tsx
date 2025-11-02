import Footer from "@/components/frontend/Footer";
import Header from "../../components/frontend/Header";
import Hero from "../../components/frontend/Hero";
import TrustedLogos from "../../components/frontend/TrustedLogos";
import TrustedCompanies from "../../components/frontend/TrustedCompanies";
import VendorsSection from "@/components/frontend/Vendor";
import FeaturesSection from "@/components/frontend/FeaturesSection";
import CategoriesSection from "@/components/frontend/Category";
import ReviewsSection from "@/components/frontend/ReviewsSection";
import WhySection from "@/components/frontend/WhySection";
import StatsSection from "@/components/frontend/StatsSection";
import FooterCTA from "@/components/frontend/FooterCTA";
import BusinessCTA from "@/components/frontend/BusinessCTA";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustedCompanies />

      <CategoriesSection />
      <BusinessCTA />

      <VendorsSection />
      {/* <TrustedLogos /> // Disabled for now */}
      <WhySection />

      <StatsSection />
      <FeaturesSection />
      <ReviewsSection />
      <FooterCTA />
      <Footer />
    </main>
  );
}
