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
    <div className="review-card-wrapper">
      {/* Avatar + Author Info */}
      <div className="flex items-start gap-3">
        <Image
          src={`/assets/avatar/image-${(review.id % 6) + 1}.png`}
          alt={review.author}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="review-author">{review.author}</h3>
          <p className="review-time">{review.time}</p>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${
                i < review.rating
                  ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Store Name */}
      <div className="review-store">{review.store}</div>

      {/* Review Excerpt */}
      <p className="review-excerpt">{review.excerpt}</p>

      {/* Review Tag */}
      <span className="review-tag">{review.tag}</span>
    </div>
  );
}
