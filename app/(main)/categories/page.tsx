import SearchBar from "@/components/frontend/SearchBar";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FooterCTA from "@/components/frontend/FooterCTA";
import CategoryGrid from "@/components/frontend/CategoryGrid";
export default function CategoriesSection() {
  return (
    <>
      <Header />
      <section className="py-20 bg-white min-h-screen">
        <SearchBar />
        <CategoryGrid />
      </section>

      <FooterCTA />
      <Footer />
    </>
  );
}
