import RatingsSummary from "@/components/frontend/profile/RatingsSummary";
import ReviewCard from "@/components/frontend/profile/ReviewCard";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FooterCTA from "@/components/frontend/FooterCTA";
import {
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { notFound } from "next/navigation";
import type { BusinessProfile } from "@/utils/types/business";
import type { StandardResponse } from "@/utils/types/api";
import { getServerApiBaseUrl } from "@/lib/serverApi";

const reviews = [
  {
    initials: "AM",
    name: "Adebayo Michael",
    rating: 5,
    date: "2 days ago",
    invited: true,
    text: "Excellent service! The tailor understood exactly what I wanted...",
    response:
      "We're thrilled that you're happy with your order. We look forward to serving you again soon.",
    responseDate: "1 day ago",
  },
];

async function fetchBusinessProfile(
  businessId: string
): Promise<BusinessProfile | null> {
  const baseUrl = getServerApiBaseUrl();
  const res = await fetch(
    `${baseUrl}/api/v1/business/${encodeURIComponent(businessId)}`,
    { cache: "no-store" }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch business profile");
  }

  const payload = (await res.json()) as StandardResponse<BusinessProfile>;
  return payload.data ?? null;
}

const maskAccountNumber = (accountNumber?: string | null) => {
  if (!accountNumber) return null;
  if (accountNumber.length <= 4) return accountNumber;
  const visible = accountNumber.slice(-4);
  return `${"•".repeat(accountNumber.length - 4)}${visible}`;
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await fetchBusinessProfile(id);
  console.log(business);

  if (!business) {
    notFound();
  }

  const verification = business.verification;
  const businessVerification = verification?.businessVerification;
  const social = verification?.socialMediaVerification;
  const personal = verification?.personalVerification;
  const bank = verification?.bankAccountVerification;
  const address = verification?.addressVerification;

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: personal?.phoneNumber,
    },
    {
      icon: Mail,
      label: "Email",
      value: businessVerification?.email,
    },
    {
      icon: Globe,
      label: "Website",
      value: businessVerification?.website,
      href: businessVerification?.website
        ? businessVerification.website.startsWith("http")
          ? businessVerification.website
          : `https://${businessVerification.website}`
        : undefined,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: social?.instagram ? `@${social.instagram}` : undefined,
      href: social?.instagram
        ? `https://instagram.com/${social.instagram.replace(/^@/, "")}`
        : undefined,
    },
  ].filter((item) => item.value);

  const keyFacts = [
    {
      label: "Verification Status",
      value:
        businessVerification?.status ||
        (business.verified ? "VERIFIED" : "PENDING"),
    },
    {
      label: "Business Type",
      value: business.businessType || "Not specified",
    },
    {
      label: "CAC Number",
      value: businessVerification?.number || "Unavailable",
    },
    {
      label: "Tax ID",
      value: businessVerification?.tin || "Unavailable",
    },
  ];

  const socialLinks = [
    { label: "Instagram", value: social?.instagram },
    { label: "Facebook", value: social?.facebook },
    { label: "TikTok", value: social?.tiktok },
    { label: "Telegram", value: social?.telegram },
    { label: "WhatsApp", value: social?.whatsapp },
    { label: "X (Twitter)", value: social?.x },
  ].filter((item) => item.value);

  const bankDetails = [
    {
      label: "Account Name",
      value: bank?.verifiedName,
    },
    {
      label: "Account Number",
      value: maskAccountNumber(bank?.accountNumber),
    },
    {
      label: "Bank Code",
      value: bank?.bankCode,
    },
  ].filter((item) => item.value);

  const businessName =
    businessVerification?.name ||
    `${personal?.firstname ?? ""} ${personal?.lastname ?? ""}`.trim() ||
    "Verified Business";

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{businessName}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mt-2">
              {business.verified && (
                <>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Verified
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span
                className={`font-medium ${
                  business.verified ||
                  businessVerification?.status === "APPROVED"
                    ? "text-green-600"
                    : "text-amber-600"
                }`}
              >
                {business.verified ||
                businessVerification?.status === "APPROVED"
                  ? "✔ Fully Verified"
                  : "Verification in progress"}
              </span>
            </div>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-800">
            Share Profile
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              {contactItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {contactItems.map(
                    ({ icon: Icon, label, value, href }, idx) => (
                      <div
                        key={`${label}-${idx}`}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700"
                      >
                        <Icon className="w-5 h-5 text-gray-400" />
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-indigo-600 transition"
                          >
                            {value}
                          </a>
                        ) : (
                          <span>{value}</span>
                        )}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No public contact details yet.
                </p>
              )}
            </section>

            <hr className="my-6 border-gray-200" />

            <section className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Business Overview
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {businessVerification?.description ||
                  "This vendor has not added a public description yet. Once their verification is complete, you'll be able to read more about their services and guarantees here."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="p-4 border border-gray-100 rounded-lg bg-white shadow-sm"
                  >
                    <p className="text-xs uppercase text-gray-500">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>

              {address?.address && (
                <div className="mt-6 flex items-start gap-3 text-sm text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Verified Address
                    </p>
                    <p>{address.address}</p>
                  </div>
                </div>
              )}
            </section>

            <section className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Financial Confidence
              </h3>
              {bankDetails.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {bankDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                    >
                      <p className="text-xs uppercase text-gray-500">
                        {detail.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Bank account verification pending.
                </p>
              )}
            </section>

            {socialLinks.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Social Presence
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((socialItem) => (
                    <a
                      key={socialItem.label}
                      href={`https://${socialItem.value
                        ?.replace(/^https?:\/\//, "")
                        .replace(/^@/, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition"
                    >
                      {socialItem.label}: {socialItem.value}
                    </a>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-3 my-6">
              <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full text-sm font-semibold hover:bg-indigo-50 transition">
                Write a review
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 transition">
                Report a concern
              </button>
            </div>

            <hr className="my-6 border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Customer Reviews
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Real customer reviews will appear here once shoppers begin
                sharing their experience with {businessName}.
              </p>

              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </section>
          </div>

          <div className="lg:col-span-1">
            <RatingsSummary />
          </div>
        </div>
      </div>
      <FooterCTA />
      <Footer />
    </>
  );
}
