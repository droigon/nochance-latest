"use client";
import ReviewCard from "./ReviewCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mock = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  author: [
    "Adunni Okafor",
    "Kemi Adebayo",
    "Folake Williams",
    "Chioma Nwachukwu",
  ][i % 4],
  time: ["2 hours ago", "5 hours ago", "1 day ago", "2 days ago"][i % 4],
  store: [
    "Glamour Hair Palace",
    "TechHub Electronics",
    "Mama Cass Kitchen",
    "Fashion Forward Boutique",
  ][i % 4],
  rating: (i % 5) + 1,
  excerpt:
    "Amazing quality here! The vendor was professional and delivered exactly what was promised. Will definitely order again.",
  tag: ["Hair Vendors", "Electronics", "Food & Restaurants", "Fashion"][i % 4],
}));

export default function ReviewsSection() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <h3 className="reviews-section-title text-xl sm:text-2xl md:text-3xl font-bold">
              Recent Reviews
            </h3>
            <p className="reviews-section-subtitle text-xs sm:text-sm text-gray-500">
              See what our community is saying
            </p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button className="review-nav-button p-1.5 sm:p-2">
              <ChevronLeft color="black" size={16} />
            </button>
            <button className="review-nav-button p-1.5 sm:p-2">
              <ChevronRight color="black" size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {mock.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
