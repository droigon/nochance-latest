"use client";

import { PrimaryButton } from "@/components/ui";
import { Info } from "lucide-react";

interface ReviewsEmptyStateProps {
  onStartCollecting: () => void;
}

export default function ReviewsEmptyState({
  onStartCollecting,
}: ReviewsEmptyStateProps) {
  return (
    <div className="px-6 pb-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Empty State Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          {/* Illustration */}
          <div className="mb-8">
            <div className="mx-auto w-32 h-32 bg-purple-100 rounded-2xl flex items-center justify-center">
              <div className="relative">
                {/* Box illustration */}
                <div className="w-16 h-12 bg-purple-200 rounded border-2 border-purple-300 relative">
                  {/* Flying elements */}
                  <div className="absolute -top-2 -right-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  </div>
                  <div className="absolute -top-1 right-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-1 -left-2">
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full"></div>
                  </div>
                  {/* Box lines */}
                  <div className="absolute top-2 left-2 right-2">
                    <div className="h-0.5 bg-purple-300"></div>
                  </div>
                  <div className="absolute top-4 left-2 right-4">
                    <div className="h-0.5 bg-purple-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              You haven&apos;t invited any customers yet.
            </h2>
            <p className="text-gray-600 mb-6">
              Start by choosing one of the methods below to collect reviews.
            </p>

            <PrimaryButton
              variant="pillSolid"
              className="px-6 py-2"
              onClick={onStartCollecting}
            >
              Invite Customers
            </PrimaryButton>
          </div>

          {/* Pro Tip */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 text-sm mb-1">
                  Pro Tip
                </h3>
                <p className="text-blue-700 text-sm">
                  The sooner you start inviting customers, the faster good looks
                  credibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
