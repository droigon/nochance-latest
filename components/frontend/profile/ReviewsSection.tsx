import ReviewCard from "./ReviewCard";

interface Review {
  initials?: string;
  name: string;
  rating: number;
  date: string;
  reviewCount?: number;
  invited?: boolean;
  verifiedPurchase?: boolean;
  text: string;
  images?: string[];
  response?: string;
  responseDate?: string;
}

interface ReviewsSectionProps {
  reviewCount: number;
  businessName: string;
  reviews: Review[];
}

export default function ReviewsSection({
  reviewCount,
  businessName,
  reviews,
}: ReviewsSectionProps) {
  return (
    <section className="bg-white  p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          All Customer Reviews ({reviewCount})
        </h2>
        <div className="flex items-center gap-2">
          <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Newest</option>
            <option>Highest Rated</option>
            <option>With Photos</option>
          </select>
        </div>
      </div>

      <div className="space-y-0">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
        {reviews.length === 0 && (
          <p className="text-sm text-gray-500 py-8 text-center">
            No reviews yet. Be the first to review {businessName}!
          </p>
        )}
      </div>

      {/* Pagination */}
      {reviewCount > 10 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-gray-200">
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            ← Previous
          </button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded text-sm font-semibold">
            1
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            10
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
            Next →
          </button>
        </div>
      )}
    </section>
  );
}
