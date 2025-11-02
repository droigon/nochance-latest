"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const Marketing: React.FC = () => {
  return (
    <div className="hidden md:flex w-1/4 flex-col justify-center items-center bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] text-white px-8 py-12">
      <div className="mb-8">
        <span className="text-4xl">✨</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Start turning your ideas into reality.
      </h2>
      <p className="mb-6 text-base max-w-xs text-center">
        Create a free account and get full access to all features for 30-days.
        No credit card needed. Trusted by over 4,000 professionals.
      </p>
      <div className="flex items-center gap-2 mb-2">
        {/* Color dots */}
        <span className="w-4 h-4 rounded-full bg-[#E5E3F7]" />
        <span className="w-4 h-4 rounded-full bg-[#D6CFC2]" />
        <span className="w-4 h-4 rounded-full bg-[#C7BFAE]" />
        <span className="w-4 h-4 rounded-full bg-[#B8AF9A]" />
        <span className="w-4 h-4 rounded-full bg-[#A9A086]" />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-yellow-400 text-lg">★ ★ ★ ★ ★</span>
        <span className="font-semibold">5.0</span>
        <span>from 2000+ reviews</span>
      </div>
    </div>
  );
};
