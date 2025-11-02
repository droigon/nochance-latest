"use client";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Scissors,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed,
  Music,
  Car,
  Home,
  Palette,
  Briefcase,
  Heart,
} from "lucide-react";
import { useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";

export default function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      title: "Hair Vendors",
      icon: Scissors,
    },
    {
      id: 2,
      title: "Fashion & Apparel",
      icon: ShoppingBag,
    },
    {
      id: 3,
      title: "Electronics & Gadgets",
      icon: Smartphone,
    },
    {
      id: 4,
      title: "Food & Restaurants",
      icon: UtensilsCrossed,
    },
    {
      id: 5,
      title: "Events & Entertainment",
      icon: Music,
    },
    {
      id: 6,
      title: "Automotive",
      icon: Car,
    },
    {
      id: 7,
      title: "Home & Garden",
      icon: Home,
    },
    {
      id: 8,
      title: "Art & Crafts",
      icon: Palette,
    },
    {
      id: 9,
      title: "Business Services",
      icon: Briefcase,
    },
    {
      id: 10,
      title: "Health & Wellness",
      icon: Heart,
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Find trusted vendors across all industries
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 border border-violet-83 rounded-full flex items-center justify-center hover:border-violet-50 hover:text-violet-50 transition-colors"
            >
              <ChevronLeft color="black" size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 border border-violet-83 rounded-full flex items-center justify-center hover:border-violet-50 hover:text-violet-50 transition-colors"
            >
              <ChevronRight color="black" size={20} />
            </button>
          </div>
        </div>

        {/* Categories Scrollable Container */}
        <div className="relative mb-16">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 text-center cursor-pointer group min-w-[140px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-gray-600 group-hover:text-purple-600 transition-colors">
                  <category.icon size={32} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-medium group-hover:text-purple-600 transition-colors whitespace-nowrap">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* See All Categories Button */}
        <div className="text-center mb-20">
          <PrimaryButton className="mx-auto" onClick={() => {}}>
            Sell All Categories <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
