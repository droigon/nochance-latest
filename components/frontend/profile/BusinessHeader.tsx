import { Star, ShieldCheck, Bookmark, CheckCircle2 } from "lucide-react";

interface BusinessHeaderProps {
  businessName: string;
  initials: string;
  businessCategory: string;
  location: string;
  averageRating: number;
  reviewCount: number;
  trustScore?: number;
  isVerified: boolean;
  isCACRegistered: boolean;
  isPhoneVerified: boolean;
}

export default function BusinessHeader({
  businessName,
  initials,
  businessCategory,
  location,
  averageRating,
  reviewCount,
  trustScore,
  isVerified,
  isCACRegistered,
  isPhoneVerified,
}: BusinessHeaderProps) {
  // Calculate trust score based on verification badges if not provided
  const calculatedTrustScore =
    trustScore ??
    (() => {
      let score = 0;
      if (isVerified) score += 40;
      if (isCACRegistered) score += 30;
      if (isPhoneVerified) score += 30;
      return score;
    })();

  return (
    <div className="bg-white  p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md">
            {initials}
          </div>

          {/* Business Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {businessName}
            </h1>
            <p className="text-gray-600 mb-3">
              {businessCategory} - {location}
            </p>

            {/* Rating and Trust Score */}
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-lg font-bold text-gray-900 ml-1">
                    {averageRating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {calculatedTrustScore > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-semibold text-indigo-900">
                    Trust Score: {calculatedTrustScore}%
                  </span>
                </div>
              )}
            </div>

            {/* Verification Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {isVerified && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Business
                </span>
              )}
              {isCACRegistered && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  CAC Registered
                </span>
              )}
              {isPhoneVerified && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  ID Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bookmark Button */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Bookmark className="w-6 h-6 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
