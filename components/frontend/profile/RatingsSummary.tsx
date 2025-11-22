// components/RatingsSummary.tsx
import { Star } from "lucide-react";

interface RatingsSummaryProps {
  averageRating?: number;
  reviewCount?: number;
}

export default function RatingsSummary({
  averageRating = 4.4,
  reviewCount = 127,
}: RatingsSummaryProps) {
  const ratingData = [
    { level: 5, count: 86, percent: 68 },
    { level: 4, count: 28, percent: 22 },
    { level: 3, count: 8, percent: 6 },
    { level: 2, count: 4, percent: 3 },
    { level: 1, count: 1, percent: 1 },
  ];

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm sticky top-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Review Summary</h3>

      {/* Overall Rating */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{reviewCount} reviews</p>
        </div>
      </div>

      {/* Rating Bar Chart */}
      <div className="space-y-2 mb-6">
        {ratingData.map((r) => {
          const barColor =
            r.level === 5
              ? "bg-green-500"
              : r.level === 4
              ? "bg-green-400"
              : r.level === 3
              ? "bg-yellow-400"
              : r.level === 2
              ? "bg-orange-400"
              : "bg-red-400";

          return (
            <div key={r.level} className="flex items-center gap-2 text-xs">
              <span className="w-4 text-right text-gray-700 font-medium">
                {r.level}
              </span>
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all`}
                  style={{ width: `${r.percent}%` }}
                ></div>
              </div>
              <span className="w-10 text-left text-gray-600">{r.count}</span>
            </div>
          );
        })}
      </div>

      {/* Quote */}
      <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded mb-6">
        <p className="text-sm text-gray-700 italic">
          "Most customers say service is reliable and friendly."
        </p>
      </div>

      {/* Response/Purchases Stats */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">2h</p>
          <p className="text-xs text-gray-500 mt-1">Avg Response Time</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">89%</p>
          <p className="text-xs text-gray-500 mt-1">Verified Purchases</p>
        </div>
      </div>
    </div>
  );
}
