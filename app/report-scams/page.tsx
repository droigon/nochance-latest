"use client";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import HowReportingWorks from "../../components/frontend/report-scam/HowReportingWorks";
import VerifiedScams from "../../components/frontend/report-scam/VerifiedScams";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Image from "next/image";
import Wizard from "@/components/frontend/report-scam/Wizard";
export default function ReportScamPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero */}
      <section className="bg-grey-98 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">
              Trust &amp; Safety <span className="mx-2">|</span> Report
            </div>

            <h1 className="heading-2 font-extrabold leading-tight">
              Report a Scam —{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: "var(--color-violet-50, #6C01FF)",
                  fontFamily: "var(--font-family-Title, Onest)",
                }}
              >
                Protect Others
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 626 82"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -47%) scale(1.1)",
                    width: "110%",
                    height: "155%",
                    stroke: "var(--color-violet-50, #6C01FF)",
                    strokeWidth: "1.8",
                    fill: "none",
                    pointerEvents: "none",
                  }}
                >
                  <path d="M299.033 69.3393C110.152 69.3393 8.88658 48.6572 0.895569 38.1161C0.895569 17.5557 140.426 0.888275 312.545 0.888275C484.664 0.888275 624.194 17.5557 624.194 38.1161C622.8 46.7624 608.213 53.4608 601.093 55.7292M182.243 72.9796C255.678 81.0395 499.971 85.9917 559.25 69.3393" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-600 mt-6 max-w-xl lead-normal">
              Protect yourself and others by exposing fraudulent businesses.
            </p>
            <p className="text-gray-600 mt-6 max-w-xl lead-normal">
              Submit scam details with proof, and Nochance will review, verify,
              and take action. Every report helps make Nigerian commerce safer.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <PrimaryButton variant="gradient">Start Report</PrimaryButton>

              <a href="#how" className="ml-4 text-gray-700 font-medium">
                How It Works
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[630px] h-[421px]">
              {/* Main image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-700 to-purple-600">
                <Image
                  src="/assets/images/report-scam2.png"
                  alt="Report a Scam"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
              </div>

              {/* Overlay cards */}
              {/* Top right (verified proof) */}
              <div className="absolute -top-4 right-0 w-52 bg-white rounded-xl p-3 shadow-lg rotate-1">
                <div className="text-xs text-gray-500">
                  1.5M+ Reports Processed
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  Verified with proof <br /> across Nigeria
                </div>
              </div>

              {/* Left middle (fake bank) */}
              <div className="absolute top-[28%] -left-16 w-52 bg-white rounded-xl p-3 shadow-md -rotate-2 border border-gray-100">
                <div className="text-xs font-semibold text-purple-600">
                  <Image
                    src="/assets/icons/web.svg"
                    alt="Bank Icon"
                    width={12}
                    height={12}
                    className="inline-block mr-1"
                  />
                  Fake Bank Account
                </div>
                <div className="text-xs text-gray-600 mt-1">Account: 1234…</div>
                <div className="text-xs text-gray-500">
                  Bank: Suspicious Bank
                </div>
              </div>

              {/* Bottom left (fake website) */}
              <div className="absolute bottom-8 -left-10 w-48 bg-white rounded-xl p-3 shadow-md rotate-1 border border-gray-100">
                <div className="text-xs font-semibold text-green-600">
                  <Image
                    src="/assets/icons/web.svg"
                    height={16}
                    width={16}
                    alt="website"
                  />
                  Fake Website
                </div>
                <div className="text-xs text-gray-600 mt-1">fake-store.com</div>
                <div className="text-xs text-gray-500">Online Shopping</div>
              </div>

              {/* Right middle (fake number) */}
              <div className="absolute top-[45%] -right-14 w-48 bg-white rounded-xl p-3 shadow-md rotate-3 border border-gray-100">
                <div className="text-xs font-semibold text-yellow-600">
                  <Image
                    src="/assets/icons/phone"
                    alt="phone"
                    width={16}
                    height={16}
                  />
                  Fake Number
                </div>
                <div className="text-xs text-gray-600 mt-1">+234 808 ****</div>
                <div className="text-xs text-gray-500">Romance Scam</div>
              </div>

              {/* Bottom right (scam flagged) */}
              <div className="absolute bottom-0 -right-8 w-52 bg-red-600 text-white rounded-xl p-3 shadow-lg -rotate-2">
                <div className="text-xs font-semibold">🚨 Scam Flagged</div>
                <div className="text-xs mt-1 opacity-90">Verified Report</div>
                <div className="text-xs font-semibold">Danger</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <HowReportingWorks />
        </div>
      </section>
      <section id="how" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Wizard />
        </div>
      </section>

      {/* Verified Scams Database */}
      <section className="py-12 bg-grey-98">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-6">
            Verified Scams Database
          </h3>
          <p className="text-gray-600 mb-6">
            Learn from others&apos; experiences. These are confirmed scam
            reports with verified evidence to help you avoid similar traps.
          </p>

          <VerifiedScams />

          <div className="mt-8 text-center">
            <a
              href="#report"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded"
            >
              Report a New Scam
            </a>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              Disclaimer: The information is based on user reports and has been
              reviewed. Please ensure all information you provide is accurate.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
