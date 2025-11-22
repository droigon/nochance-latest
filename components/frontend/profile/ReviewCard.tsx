// components/ReviewCard.js

import { StarIcon, CheckCircleIcon } from "lucide-react";
import { ReviewData } from "@/dtos/business.dto";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

interface ReviewCardProps {
  review: ReviewData;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Generate initials from name if not provided
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = review.initials || getInitials(review.name);

  return (
    <div className="py-6 border-b border-gray-100">
      {/* Review Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-sm font-semibold text-indigo-800">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{review.name}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <StarRating rating={review.rating} />
              <span>{review.date}</span>
              {review.invited && (
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-medium">
                  Invited
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Content */}
      <div className="mt-3 pl-14">
        <div className="flex items-center text-xs space-x-1 mb-2">
          <CheckCircleIcon className="w-3 h-3 text-green-500" />
          <span className="font-medium text-green-600">Verified Review</span>
        </div>
        <p className="text-gray-700">{review.text}</p>

        {/* Business Response */}
        {review.response && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border-l-2 border-gray-300">
            <p className="text-xs font-semibold text-gray-800">
              Tailor Brands{" "}
              <span className="font-normal text-gray-500 ml-1">
                {review.responseDate}
              </span>
            </p>
            <p className="text-sm text-gray-700 mt-1">{review.response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
