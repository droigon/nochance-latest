import RatingsSummary from "@/components/frontend/profile/RatingsSummary";
import BusinessHeader from "@/components/frontend/profile/BusinessHeader";
import ContactInformation from "@/components/frontend/profile/ContactInformation";
import BusinessDetails from "@/components/frontend/profile/BusinessDetails";
import ReviewsSection from "@/components/frontend/profile/ReviewsSection";
import AccountInformation from "@/components/frontend/profile/AccountInformation";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FooterCTA from "@/components/frontend/FooterCTA";
import { notFound } from "next/navigation";
import type { BusinessProfile } from "@/utils/types/business";
import { BusinessService } from "@/services/business/business";

const reviews = [
  {
    initials: "AM",
    name: "Adebayo Michael",
    rating: 5,
    date: "2 days ago",
    reviewCount: 2,
    invited: true,
    verifiedPurchase: true,
    text: "Excellent service! The tailor understood exactly what I wanted and delivered beyond my expectations. The attention to detail is remarkable and the fitting is perfect. Highly recommend for anyone looking for quality tailoring services.",
    images: ["/image1.jpg", "/image2.jpg"],
    response:
      "We're thrilled that you're happy with your order. We look forward to serving you again soon.",
    responseDate: "1 day ago",
  },
  {
    initials: "FO",
    name: "Funmi Oladele",
    rating: 4,
    date: "1 week ago",
    reviewCount: 2,
    verifiedPurchase: true,
    text: "Great experience overall. The staff was professional and the turnaround time was reasonable. My dress came out beautifully and fits perfectly. Only minor issue was communication could be better, but the end result speaks for itself.",
  },
  {
    initials: "CJ",
    name: "Chidi Johnson",
    rating: 5,
    date: "2 weeks ago",
    reviewCount: 1,
    invited: true,
    verifiedPurchase: true,
    text: "Outstanding work! I've been to many tailors in Lagos but this is by far the best. The attention to detail and quality of work is exceptional. They really understand fashion and style. Will definitely be back for more orders.",
  },
];

async function fetchBusinessProfile(
  businessId: string
): Promise<BusinessProfile | null> {
  const res = await BusinessService.getBusiness(businessId);

  if (!res.success || res.statusCode === 404) {
    return null;
  }

  if (!res.success) {
    throw new Error("Failed to fetch business profile");
  }

  return res.data ?? null;
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await fetchBusinessProfile(id);
  console.log("business", business);

  if (!business) {
    notFound();
  }

  const verification = business.verification;
  const businessVerification = verification?.businessVerification;
  const social = verification?.socialMediaVerification;
  const personal = verification?.personalVerification;
  const address = verification?.addressVerification;
  const bank = verification?.bankAccountVerification;

  const businessName =
    businessVerification?.name ||
    `${personal?.firstname ?? ""} ${personal?.lastname ?? ""}`.trim() ||
    "Verified Business";

  // Generate initials for logo
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(businessName);
  const businessCategory = business.businessType || "Business";
  const location = address?.address
    ? address.address.split(",").slice(-2).join(", ")
    : "Location not specified";

  // Mock rating data - replace with real data when available
  const averageRating = 4.4;
  const reviewCount = business._count?.reviews || 2847;

  // Services list - can be extracted from business data or made dynamic
  const services: string[] = [
    //"Custom Suits",
    //"Wedding Dresses",
    //"Corporate Wear",
    //"Traditional Attire",
    //"Alterations",
  ];

  const isVerified =
    business.verified || businessVerification?.status === "APPROVED";
  const isCACRegistered = !!businessVerification?.number;
  const isPhoneVerified = !!personal?.phoneNumber;

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BusinessHeader
              businessName={businessName}
              initials={initials}
              businessCategory={businessCategory}
              location={location}
              averageRating={averageRating}
              reviewCount={reviewCount}
              isVerified={isVerified}
              isCACRegistered={isCACRegistered}
              isPhoneVerified={isPhoneVerified}
            />
            <ContactInformation
              whatsapp={social?.whatsapp}
              phoneNumber={personal?.phoneNumber}
              email={businessVerification?.email}
              instagram={social?.instagram}
              tiktok={social?.tiktok}
              facebook={social?.facebook}
              telegram={social?.telegram}
              x={social?.x}
            />
            <AccountInformation
              bankCode={bank?.bankCode}
              accountNumber={bank?.accountNumber}
              accountName={bank?.verifiedName}
              verifiedName={bank?.verifiedName}
            />
            <BusinessDetails
              businessName={businessName}
              description={businessVerification?.description}
              services={services}
              isPhoneVerified={isPhoneVerified}
              isVerified={isVerified}
              isCACRegistered={isCACRegistered}
              whatsapp={social?.whatsapp}
              facebook={social?.facebook}
              instagram={social?.instagram}
            />

            <ReviewsSection
              reviewCount={reviewCount}
              businessName={businessName}
              reviews={reviews}
            />
          </div>

          <div className="lg:col-span-1">
            <RatingsSummary
              averageRating={averageRating}
              reviewCount={reviewCount}
            />
          </div>
        </div>
      </div>
      <FooterCTA />
      <Footer />
    </>
  );
}
