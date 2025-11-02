import Link from "next/link";
import AccordionItem from "../../../components/frontend/AccordionItem";

export default function FAQPage() {
  return (
    <section className="bg-grey-98 text-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="heading-3 text-3xl md:text-4xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3">
            Get answers to common questions about scam prevention and
            verification.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          <AccordionItem title="How does Nochance help prevent scam victims?">
            Nochance uses a combination of identity verification,
            community-driven reporting, and automated risk checks to detect
            suspicious behaviour and prevent scams before they reach victims.
          </AccordionItem>

          <AccordionItem title="Is Nochance suitable for small business and entrepreneurs?">
            Yes — Nochance is designed to be accessible for small businesses and
            entrepreneurs. The platform offers easy onboarding and scalable
            tools to fit growing needs.
          </AccordionItem>

          <AccordionItem title="What types of scams does Nochance detect most effectively?">
            Nochance is effective at identifying account-takeover, phishing,
            social-engineering, and suspicious payment activity using pattern
            recognition and behavioral signals.
          </AccordionItem>

          <AccordionItem title="How can I contribute to the Nochance community database?">
            You can contribute by reporting suspicious accounts and incidents
            through the dashboard. Reports are reviewed and, when verified,
            added to the community database to help others stay safe.
          </AccordionItem>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/contact"
            className="inline-block text-purple-600 font-medium hover:text-purple-500"
          >
            Contact our support team →
          </Link>
        </div>
      </div>
    </section>
  );
}
