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
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="reviews-section-title text-2xl font-bold">
              Recent Reviews
            </h3>
            <p className="reviews-section-subtitle text-sm text-gray-500">
              See what our community is saying
            </p>
          </div>

          <div className="flex gap-3">
            <button className="review-nav-button">
              <ChevronLeft color="black" size={16} />
            </button>
            <button className="review-nav-button">
              <ChevronRight color="black" size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mock.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
