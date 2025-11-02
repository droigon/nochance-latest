// pages/privacy.tsx
import React from "react";
import Link from "next/link";

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Effective Date: <strong>08-08-2025</strong>
          </p>
        </header>

        <section id="intro" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            NoChance (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is
            committed to protecting the privacy of our users. This Privacy
            Policy explains how we collect, use, share, and retain personal
            information when you use our website and services.
          </p>
        </section>

        <section id="what-we-collect" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <p>
            We collect information you provide and information collected
            automatically:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Personal Information:</strong> name, email, phone,
              address, business registration details (CAC records), TIN,
              NIN/BVN, government-issued IDs, directors&#39; details.
            </li>
            <li>
              <strong>Verification Documents:</strong> uploaded files such as
              certificates, utility bills, product documents.
            </li>
            <li>
              <strong>Financial Information:</strong> payment information
              processed via third-party payment processors (we do not store full
              payment card details).
            </li>
            <li>
              <strong>Usage & Technical Data:</strong> IP address,
              device/browser information, cookies, logs.
            </li>
            <li>
              <strong>Third-Party Data:</strong> data from public registries,
              data providers, government databases.
            </li>
          </ul>
        </section>

        <section id="how-we-use" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6">
            <li>To provide and improve verification services.</li>
            <li>
              To perform identity and business checks and to issue verification
              results.
            </li>
            <li>
              To communicate (support, status updates, transactional emails,
              security alerts).
            </li>
            <li>
              To comply with legal obligations, anti-money laundering (AML), and
              regulatory requirements.
            </li>
            <li>For analytics, fraud prevention, and product development.</li>
          </ul>
        </section>

        <section id="legal-bases" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            4. Legal Bases for Processing
          </h2>
          <p>
            Where applicable (e.g., GDPR), we rely on lawful bases including:
            consent, contract performance, legal compliance, and legitimate
            interests (fraud prevention, service improvement), depending on the
            type of processing.
          </p>
        </section>

        <section id="sharing" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            5. Sharing & Disclosure
          </h2>
          <p>We may share data with:</p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Service Providers:</strong> hosting, analytics, payment
              processors, communication platforms.
            </li>
            <li>
              <strong>Government & Regulators:</strong> when required for
              compliance, legal requests, or verification.
            </li>
            <li>
              <strong>Partners:</strong> authorized partners performing
              verification tasks.
            </li>
            <li>
              <strong>Business Transfers:</strong> in connection with mergers,
              acquisitions, or asset sales (with notice).
            </li>
          </ul>
          <p>We do not sell personal data to third parties.</p>
        </section>

        <section id="cookies" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Cookies & Tracking</h2>
          <p>
            We use cookies and similar technologies to operate the Service,
            improve user experience, and provide analytics. You can manage
            cookie preferences via your browser or the cookie banner. For
            details, see below:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Essential Cookies:</strong> required for site operation
              (login, session).
            </li>
            <li>
              <strong>Analytics Cookies:</strong> used for usage analytics and
              product improvements.
            </li>
            <li>
              <strong>Advertising/Marketing:</strong> used for marketing and
              performance measurement (where applicable).
            </li>
          </ul>
        </section>

        <section id="security" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Security</h2>
          <p>
            We use reasonable technical and organizational measures (encryption
            at rest/in transit, access controls) to protect personal data. No
            method is 100% secure; in the event of a breach we will notify
            affected users and authorities as required by law.
          </p>
        </section>

        <section id="data-retention" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary to provide
            services, meet legal obligations, resolve disputes, and enforce
            agreements. Retention periods vary by data type and jurisdiction.
          </p>
        </section>

        <section id="user-rights" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights to: access,
            rectify, erase, restrict processing, object to processing, and data
            portability. To exercise rights, contact{" "}
            <a href="mailto:privacy@nochance.app" className="underline">
              privacy@nochance.app
            </a>
            .
          </p>
        </section>

        <section id="international" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            10. International Transfers
          </h2>
          <p>
            We may transfer data across borders to service providers or
            partners. Where required, we use legal safeguards such as standard
            contractual clauses or other lawful transfer mechanisms.
          </p>
        </section>

        <section id="children" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">11. Children</h2>
          <p>
            Our Services are not directed at children under 18. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section id="changes" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            12. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy. We will post changes to this page
            with the updated effective date. Significant changes may be
            communicated through the platform or email.
          </p>
        </section>

        <section id="contact" className="mb-8">
          <h2 className="text-xl font-semibold mb-2">13. Contact</h2>
          <p>
            For privacy questions or data requests contact us at{" "}
            <a href="mailto:privacy@nochance.app" className="underline">
              privacy@nochance.app
            </a>
            .
          </p>
        </section>

        <div className="text-sm text-gray-500">
          <p>
            Return to <Link href="/">NoChance Home</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
