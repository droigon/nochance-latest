"use client";

import { useState } from "react";
import Header from "@/components/frontend/Header";
import { PrimaryButton } from "@/components/ui";
import ReviewsEmptyState from "@/components/dashboard/components/vendor/reviews/ReviewsEmptyState";
import ReviewsCollectionModal from "@/components/dashboard/components/vendor/reviews/ReviewsCollectionModal";
import ReviewsDashboard from "@/components/dashboard/components/vendor/reviews/ReviewsDashboard";

export default function ReviewsPage() {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [hasReviews, setHasReviews] = useState(false); // Toggle this to see different states

  // For demo purposes - you can remove this in production
  const toggleDemoState = () => {
    setHasReviews(!hasReviews);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Get Reviews
                </h1>
                <p className="text-gray-600 mt-1">
                  Invite your customers to share their experiences and grow your
                  reputation
                </p>
              </div>
              {hasReviews && (
                <PrimaryButton
                  variant="pillSolid"
                  className="px-6 py-2"
                  onClick={() => setShowCollectionModal(true)}
                >
                  Send Invitations
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>

        {/* Demo Toggle - Remove in production */}
        <div className="fixed top-20 right-4 z-40">
          <button
            onClick={toggleDemoState}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-purple-700 transition-colors"
          >
            Toggle: {hasReviews ? "Dashboard" : "Empty State"}
          </button>
        </div>

        {!hasReviews ? (
          <ReviewsEmptyState
            onStartCollecting={() => setShowCollectionModal(true)}
          />
        ) : (
          <ReviewsDashboard
            onStartCollecting={() => setShowCollectionModal(true)}
          />
        )}

        <ReviewsCollectionModal
          isOpen={showCollectionModal}
          onClose={() => setShowCollectionModal(false)}
        />
      </div>
    </>
  );
}
