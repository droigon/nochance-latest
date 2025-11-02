"use client";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import HowReportingWorks from "../../../components/frontend/report-scam/HowReportingWorks";
import VerifiedScams from "../../../components/frontend/report-scam/VerifiedScams";
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
      <section id="how" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <HowReportingWorks />
        </div>
      </section>

      {/* Report Scam Form */}
      <section id="report" className="py-16 bg-grey-98">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white ">
                <Wizard />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white  p-6 sticky top-6">
                {/* What to Include */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M7.49477 13.125H8.25977V9.375H9.75977V13.125H10.5248C10.5748 12.695 10.7148 12.275 10.9448 11.865C11.1448 11.495 11.4398 11.095 11.8298 10.665L12.0398 10.44C12.3298 10.14 12.4898 9.975 12.5198 9.945C12.8398 9.545 13.0848 9.105 13.2548 8.625C13.4248 8.145 13.5098 7.645 13.5098 7.125C13.5098 6.315 13.3048 5.56 12.8948 4.86C12.4948 4.18 11.9548 3.64 11.2748 3.24C10.5748 2.83 9.81977 2.625 9.00977 2.625C8.19977 2.625 7.44477 2.83 6.74477 3.24C6.06477 3.64 5.52477 4.18 5.12477 4.86C4.71477 5.56 4.50977 6.315 4.50977 7.125C4.50977 7.645 4.59477 8.145 4.76477 8.625C4.93477 9.105 5.17977 9.54 5.49977 9.93C5.52977 9.97 5.68977 10.14 5.97977 10.44L6.18977 10.665C6.57977 11.095 6.87477 11.495 7.07477 11.865C7.30477 12.275 7.44477 12.695 7.49477 13.125ZM7.50977 14.625V15.375H10.5098V14.625H7.50977ZM4.32977 10.875C3.90977 10.355 3.58477 9.78 3.35477 9.15C3.12477 8.5 3.00977 7.825 3.00977 7.125C3.00977 6.035 3.28477 5.025 3.83477 4.095C4.36477 3.195 5.07977 2.48 5.97977 1.95C6.90977 1.4 7.91977 1.125 9.00977 1.125C10.0998 1.125 11.1098 1.4 12.0398 1.95C12.9398 2.48 13.6548 3.195 14.1848 4.095C14.7348 5.025 15.0098 6.035 15.0098 7.125C15.0098 7.825 14.8948 8.5 14.6648 9.15C14.4348 9.78 14.1098 10.355 13.6898 10.875C13.6198 10.965 13.4798 11.115 13.2698 11.325C12.8798 11.735 12.6048 12.06 12.4448 12.3C12.1548 12.72 12.0098 13.12 12.0098 13.5V15.375C12.0098 15.645 11.9423 15.895 11.8073 16.125C11.6723 16.355 11.4898 16.5375 11.2598 16.6725C11.0298 16.8075 10.7798 16.875 10.5098 16.875H7.50977C7.23977 16.875 6.98977 16.8075 6.75977 16.6725C6.52977 16.5375 6.34727 16.355 6.21227 16.125C6.07727 15.895 6.00977 15.645 6.00977 15.375V13.5C6.00977 13.12 5.86477 12.72 5.57477 12.3C5.41477 12.06 5.13977 11.735 4.74977 11.325C4.53977 11.115 4.39977 10.965 4.32977 10.875Z"
                          fill="#16A34A"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      What to Include
                    </h3>
                  </div>

                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Screenshots of conversations or communications
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Payment receipts or bank transfer confirmations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Website URLs, social media profiles, or phone numbers
                        used
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Exact dates and amounts involved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Any promises made that weren&apos;t fulfilled</span>
                    </li>
                  </ul>
                </div>

                {/* What Happens Next */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M9.00977 16.5C7.98977 16.5 7.01477 16.305 6.08477 15.915C5.19477 15.535 4.40227 14.9975 3.70727 14.3025C3.01227 13.6075 2.47477 12.815 2.09477 11.925C1.70477 10.995 1.50977 10.02 1.50977 9C1.50977 7.98 1.70477 7.005 2.09477 6.075C2.47477 5.185 3.01227 4.3925 3.70727 3.6975C4.40227 3.0025 5.19477 2.465 6.08477 2.085C7.01477 1.695 7.98977 1.5 9.00977 1.5C10.0298 1.5 11.0048 1.695 11.9348 2.085C12.8248 2.465 13.6173 3.0025 14.3123 3.6975C15.0073 4.3925 15.5448 5.185 15.9248 6.075C16.3148 7.005 16.5098 7.98 16.5098 9C16.5098 10.02 16.3148 10.995 15.9248 11.925C15.5448 12.815 15.0073 13.6075 14.3123 14.3025C13.6173 14.9975 12.8248 15.535 11.9348 15.915C11.0048 16.305 10.0298 16.5 9.00977 16.5ZM9.00977 15C10.0998 15 11.1098 14.725 12.0398 14.175C12.9398 13.645 13.6548 12.93 14.1848 12.03C14.7348 11.1 15.0098 10.09 15.0098 9C15.0098 7.91 14.7348 6.9 14.1848 5.97C13.6548 5.07 12.9398 4.355 12.0398 3.825C11.1098 3.275 10.0998 3 9.00977 3C7.91977 3 6.90977 3.275 5.97977 3.825C5.07977 4.355 4.36477 5.07 3.83477 5.97C3.28477 6.9 3.00977 7.91 3.00977 9C3.00977 10.09 3.28477 11.1 3.83477 12.03C4.36477 12.93 5.07977 13.645 5.97977 14.175C6.90977 14.725 7.91977 15 9.00977 15ZM9.75977 9H12.7598V10.5H8.25977V5.25H9.75977V9Z"
                          fill="#2563EB"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      What Happens Next
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-blue-600">
                          1
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Review
                        </h4>
                        <p className="text-xs text-gray-600">
                          We review your report within 24-72 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-blue-600">
                          2
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Investigation
                        </h4>
                        <p className="text-xs text-gray-600">
                          Our team investigates the claim and verifies details
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-blue-600">
                          3
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Publication
                        </h4>
                        <p className="text-xs text-gray-600">
                          Verified scams are published to warn others
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy & Safety */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6  rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                      >
                        <path
                          d="M9.00977 0.75L15.1748 2.115C15.3448 2.155 15.4848 2.245 15.5948 2.385C15.7048 2.525 15.7598 2.68 15.7598 2.85V10.335C15.7598 11.095 15.5823 11.805 15.2273 12.465C14.8723 13.125 14.3798 13.665 13.7498 14.085L9.00977 17.25L4.26977 14.085C3.63977 13.665 3.14727 13.125 2.79227 12.465C2.43727 11.805 2.25977 11.095 2.25977 10.335V2.85C2.25977 2.68 2.31477 2.525 2.42477 2.385C2.53477 2.245 2.67477 2.155 2.84477 2.115L9.00977 0.75ZM9.00977 2.28L3.75977 3.45V10.335C3.75977 10.845 3.87727 11.32 4.11227 11.76C4.34727 12.2 4.67477 12.56 5.09477 12.84L9.00977 15.45L12.9248 12.84C13.3448 12.56 13.6723 12.2 13.9073 11.76C14.1423 11.32 14.2598 10.845 14.2598 10.335V3.45L9.00977 2.28ZM12.3548 6.165L13.4048 7.23L8.63477 12L5.45477 8.82L6.51977 7.755L8.63477 9.885L12.3548 6.165Z"
                          fill="#9333EA"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Privacy & Safety
                    </h3>
                  </div>

                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        Your personal information is protected and encrypted
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                      <span>
                        Anonymous reports cannot be traced back to you
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        You control what information you share with us
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
            <p className="mb-2 lead">
              {" "}
              Don&apos;t see a scam you experienced? Help protect others by
              reporting it.
            </p>
            <PrimaryButton
              variant="solidRounded"
              className="mt-4"
              href="#report"
            >
              Report a New Scam
            </PrimaryButton>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                className="flex-shrink-0 mt-0.5"
              >
                <path
                  d="M10.4193 18.3334C9.28594 18.3334 8.2026 18.1167 7.16927 17.6834C6.18038 17.2612 5.29983 16.6639 4.5276 15.8917C3.75538 15.1195 3.15816 14.2389 2.73594 13.25C2.3026 12.2167 2.08594 11.1334 2.08594 10C2.08594 8.86671 2.3026 7.78337 2.73594 6.75004C3.15816 5.76115 3.75538 4.8806 4.5276 4.10837C5.29983 3.33615 6.18038 2.73893 7.16927 2.31671C8.2026 1.88337 9.28594 1.66671 10.4193 1.66671C11.5526 1.66671 12.6359 1.88337 13.6693 2.31671C14.6582 2.73893 15.5387 3.33615 16.3109 4.10837C17.0832 4.8806 17.6804 5.76115 18.1026 6.75004C18.5359 7.78337 18.7526 8.86671 18.7526 10C18.7526 11.1334 18.5359 12.2167 18.1026 13.25C17.6804 14.2389 17.0832 15.1195 16.3109 15.8917C15.5387 16.6639 14.6582 17.2612 13.6693 17.6834C12.6359 18.1167 11.5526 18.3334 10.4193 18.3334ZM10.4193 16.6667C11.6304 16.6667 12.7526 16.3612 13.7859 15.75C14.7859 15.1612 15.5804 14.3667 16.1693 13.3667C16.7804 12.3334 17.0859 11.2112 17.0859 10C17.0859 8.78893 16.7804 7.66671 16.1693 6.63337C15.5804 5.63337 14.7859 4.83893 13.7859 4.25004C12.7526 3.63893 11.6304 3.33337 10.4193 3.33337C9.20816 3.33337 8.08594 3.63893 7.0526 4.25004C6.0526 4.83893 5.25816 5.63337 4.66927 6.63337C4.05816 7.66671 3.7526 8.78893 3.7526 10C3.7526 11.2112 4.05816 12.3334 4.66927 13.3667C5.25816 14.3667 6.0526 15.1612 7.0526 15.75C8.08594 16.3612 9.20816 16.6667 10.4193 16.6667ZM9.58594 5.83337H11.2526V7.50004H9.58594V5.83337ZM9.58594 9.16671H11.2526V14.1667H9.58594V9.16671Z"
                  fill="#CA8A04"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Disclaimer
                </h3>
                <p className="text-sm text-yellow-800 leading-relaxed">
                  The information in this database is based on user reports and
                  our investigations. While we verify reports to the best of our
                  ability, Nochance cannot guarantee the accuracy of all claims.
                  Businesses listed here may have resolved issues or improved
                  their practices. Always conduct your due diligence before
                  making business decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
