"use client";
import Image from "next/image";
import { Star } from "lucide-react";

type Review = {
  id: number;
  author: string;
  time: string;
  store: string;
  rating: number; // 1–5
  excerpt: string;
  tag: string;
};

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card-wrapper p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-200">
      {/* Avatar + Author Info */}
      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Image
          src={`/assets/avatar/image-${(review.id % 6) + 1}.png`}
          alt={review.author}
          width={48}
          height={48}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="review-author text-xs sm:text-sm md:text-base font-semibold truncate">{review.author}</h3>
          <p className="review-time text-xs sm:text-xs text-gray-500">{review.time}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-0.5 sm:gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                i < review.rating
                  ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Store Name */}
      <div className="review-store text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 truncate">{review.store}</div>

      {/* Review Excerpt */}
      <p className="review-excerpt text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">{review.excerpt}</p>

      {/* Review Tag */}
      <span className="review-tag inline-block px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 truncate">{review.tag}</span>
    </div>
  );
}
