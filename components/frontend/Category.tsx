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
import Link from "next/link";
import { useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";

export default function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 1,
      title: "Hair Vendors",
      icon: Scissors,
      bgColor: "bg-pink-100",
      textColor: "text-pink-900",
      hoverBg: "hover:bg-pink-200",
      iconColor: "text-pink-700",
    },
    {
      id: 2,
      title: "Fashion & Apparel",
      icon: ShoppingBag,
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
      hoverBg: "hover:bg-purple-200",
      iconColor: "text-purple-700",
    },
    {
      id: 3,
      title: "Electronics & Gadgets",
      icon: Smartphone,
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
      hoverBg: "hover:bg-blue-200",
      iconColor: "text-blue-700",
    },
    {
      id: 4,
      title: "Food & Restaurants",
      icon: UtensilsCrossed,
      bgColor: "bg-amber-100",
      textColor: "text-amber-900",
      hoverBg: "hover:bg-amber-200",
      iconColor: "text-amber-700",
    },
    {
      id: 5,
      title: "Events & Entertainment",
      icon: Music,
      bgColor: "bg-green-100",
      textColor: "text-green-900",
      hoverBg: "hover:bg-green-200",
      iconColor: "text-green-700",
    },
    {
      id: 6,
      title: "Automotive",
      icon: Car,
      bgColor: "bg-orange-100",
      textColor: "text-orange-900",
      hoverBg: "hover:bg-orange-200",
      iconColor: "text-orange-700",
    },
    {
      id: 7,
      title: "Home & Garden",
      icon: Home,
      bgColor: "bg-teal-100",
      textColor: "text-teal-900",
      hoverBg: "hover:bg-teal-200",
      iconColor: "text-teal-700",
    },
    {
      id: 8,
      title: "Art & Crafts",
      icon: Palette,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-900",
      hoverBg: "hover:bg-indigo-200",
      iconColor: "text-indigo-700",
    },
    {
      id: 9,
      title: "Business Services",
      icon: Briefcase,
      bgColor: "bg-sky-100",
      textColor: "text-sky-900",
      hoverBg: "hover:bg-sky-200",
      iconColor: "text-sky-700",
    },
    {
      id: 10,
      title: "Health & Wellness",
      icon: Heart,
      bgColor: "bg-rose-100",
      textColor: "text-rose-900",
      hoverBg: "hover:bg-rose-200",
      iconColor: "text-rose-700",
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
    <div className="bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 md:mb-16 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Find trusted vendors across all industries
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-violet-83 rounded-full flex items-center justify-center hover:border-violet-50 hover:text-violet-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft color="black" size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 sm:w-12 sm:h-12 border border-violet-83 rounded-full flex items-center justify-center hover:border-violet-50 hover:text-violet-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight color="black" size={20} />
            </button>
          </div>
        </div>

        {/* Categories Scrollable Container */}
        <div className="relative mb-8 sm:mb-12 md:mb-16 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-3 sm:pb-4 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex-shrink-0 text-center cursor-pointer group min-w-[140px] sm:min-w-[160px] md:min-w-[180px] p-4 sm:p-5 md:p-6 rounded-lg transition-all duration-300 ${category.bgColor} ${category.hoverBg}`}
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center transition-colors">
                  <category.icon
                    size={24}
                    strokeWidth={1.5}
                    className={`${category.iconColor} sm:w-8 sm:h-8 md:w-8 md:h-8`}
                  />
                </div>

                {/* Title */}
                <h3
                  className={`text-xs sm:text-sm md:text-base font-medium transition-colors line-clamp-2 ${category.textColor}`}
                >
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* See All Categories Button */}
        <div className="text-center">
          <Link href="/categories">
            <PrimaryButton className="mx-auto text-sm sm:text-base">
              See All Categories{" "}
              <ArrowRight size={16} className="sm:w-5 sm:h-5" />
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
