import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import ContactInfoSection from "@/components/frontend/contact/ContactInfoSection";
import ContactFormSection from "@/components/frontend/contact/ContactFormSection";
import FAQPage from "../faq/page";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Contact Info Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h2 className="heading-2">Get in Touch</h2>
            <p className="text-gray-500 mt-2">
              Have questions? We&apos;re here to help. Reach out and let&apos;s
              connect.
            </p>
          </div>

          <ContactInfoSection />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <ContactFormSection />
        </div>
      </section>

      <FAQPage />
      <Footer />
    </main>
  );
}
