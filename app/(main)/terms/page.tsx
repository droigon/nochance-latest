// app/terms/page.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm">
            Effective Date: <strong>08-08-2025</strong>
          </p>
        </header>

        {/* Sections */}
        <section className="space-y-10 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using NoChance (&quot;we&quot;, &quot;us&quot;,
              &quot;our&quot;) services, you agree to be bound by these Terms of
              Service and our Privacy Policy. If you do not agree, you may not
              use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Services Provided</h2>
            <p>
              NoChance provides business compliance and verification solutions
              including identity verification, document validation, and product
              authenticity checks. Services may evolve over time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Eligibility</h2>
            <p>
              You must be at least 18 years old and legally capable of entering
              into a binding contract. Businesses must be duly registered in
              their respective jurisdictions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. User Obligations</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Provide accurate and complete information during verification.
              </li>
              <li>Comply with all applicable laws and regulations.</li>
              <li>Not misuse or attempt to circumvent verification results.</li>
              <li>Keep login credentials confidential and secure.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Payments</h2>
            <p>
              Certain services may require fees. Payments are processed via
              third-party providers. All fees are non-refundable unless
              otherwise stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Prohibited Uses</h2>
            <p>You agree not to use the platform to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Submit false, misleading, or fraudulent documents.</li>
              <li>Violate laws, regulations, or third-party rights.</li>
              <li>
                Engage in activities that could harm NoChance’s reputation.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              7. Intellectual Property
            </h2>
            <p>
              All content, trademarks, and technology used in the service remain
              the property of NoChance or its licensors. You may not reproduce,
              distribute, or reverse-engineer without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">
              8. Limitation of Liability
            </h2>
            <p>
              NoChance is not liable for any indirect, incidental, or
              consequential damages arising from use of our services.
              Verification results are based on provided data and third-party
              sources and are not guaranteed to be error-free.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access if you violate
              these Terms, misuse services, or engage in unlawful activity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Updated terms will be
              posted here with the new effective date. Continued use of the
              service after updates means acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of Nigeria, without regard to conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">12. Contact</h2>
            <p>
              For questions regarding these Terms, contact us at{" "}
              <a
                href="mailto:legal@nochance.app"
                className="text-blue-600 hover:underline"
              >
                legal@nochance.app
              </a>
              .
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-sm text-gray-500 text-center">
          <p>
            Return to{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              NoChance Home
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
