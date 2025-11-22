"use client";

import React from "react";
import Link from "next/link";
import { useVerification, StepId } from "@/context/VerificationContext";
import {
  AlertCircle,
  Loader,
  Check,
  User,
  Share2,
  Briefcase,
  FileText,
  Banknote,
  Camera,
  Package,
  MapPin,
} from "lucide-react";

// Map step IDs to icons and details
const STEP_CONFIG: Record<
  StepId,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
  }
> = {
  PERSONAL: {
    label: "Personal Details",
    description:
      "Provide your full name, email, phone number, and date of birth to set up your profile.",
    icon: <User className="w-6 h-6" />,
    iconBg: "bg-blue-100 text-blue-600",
  },
  SOCIAL: {
    label: "Social Media Handles",
    description:
      "Add your key social accounts (Instagram, X/Twitter, TikTok, YouTube, etc.) to help customers and brands find and verify you.",
    icon: <Share2 className="w-6 h-6" />,
    iconBg: "bg-red-100 text-red-600",
  },
  BUSINESS: {
    label: "Business Information",
    description: "Add your business license for enhanced credibility",
    icon: <Briefcase className="w-6 h-6" />,
    iconBg: "bg-orange-100 text-orange-600",
  },
  IDENTITY: {
    label: "Identity Verification",
    description:
      "Enter your National Identification Number (NIN) and Bank Verification Number (BVN) to confirm your identity and prevent fraud.",
    icon: <FileText className="w-6 h-6" />,
    iconBg: "bg-yellow-100 text-yellow-600",
  },
  BANK: {
    label: "Bank Account Details",
    description:
      "Provide your 10-digit bank account number. We'll verify it automatically.",
    icon: <Banknote className="w-6 h-6" />,
    iconBg: "bg-green-100 text-green-600",
  },
  LIVENESS: {
    label: "Supporting text",
    description:
      "Complete a quick selfie check to confirm you're the real person behind this account.",
    icon: <Camera className="w-6 h-6" />,
    iconBg: "bg-purple-100 text-purple-600",
  },
  PRODUCT_COMPLIANCE: {
    label: "Product Compliance",
    description: "Compliance details for your products",
    icon: <Package className="w-6 h-6" />,
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  ADDRESS: {
    label: "Address Verification",
    description: "Verify your address",
    icon: <MapPin className="w-6 h-6" />,
    iconBg: "bg-cyan-100 text-cyan-600",
  },
};

export function VerificationChecklist() {
  const { status, loading, error, vendorType, currentStep, getStepOrder } =
    useVerification();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
          <p className="text-gray-600">Loading verification steps...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!status || !vendorType) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Verification information not available</p>
      </div>
    );
  }

  const stepOrder = getStepOrder();
  const totalCount = status.totalSteps;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-700">
          Complete your setup ({totalCount})
        </h2>
        <span className="text-sm font-medium text-primary">
          {status.completionPercentage}% completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${status.completionPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="mt-6 space-y-3">
        {stepOrder.map((stepId: StepId, index: number) => {
          const step = status.steps.find((s) => s.stepId === stepId);
          const isCompleted = step?.completed || false;
          const isActive = currentStep === stepId;
          // Steps are available if they're completed or if all previous steps are completed
          const isAvailable =
            isCompleted ||
            index === 0 ||
            stepOrder.slice(0, index).every((s) => {
              const prevStep = status.steps.find((st) => st.stepId === s);
              return prevStep?.completed;
            });

          const config = STEP_CONFIG[stepId];
          const href = `/dashboard/vendor/verifications/${stepId.toLowerCase()}`;

          return (
            <Link key={stepId} href={href}>
              <div
                className={`w-full text-left rounded-lg p-4 flex items-start gap-4 transition-all ${
                  isCompleted
                    ? "bg-white border-2 border-green-500 shadow-sm hover:shadow-md"
                    : isActive
                    ? "bg-white border-2 border-blue-500 shadow-sm hover:shadow-md"
                    : isAvailable
                    ? "bg-white border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300"
                    : "bg-gray-50 border-2 border-gray-100 opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0 ${config.iconBg}`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : (
                    config.icon
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-gray-900">
                      {config.label}
                    </h3>
                    {isCompleted && (
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {config.description}
                  </p>
                </div>

                {/* Right Arrow */}
                <div className="flex items-center text-gray-400 flex-shrink-0">
                  {isCompleted ? (
                    <span className="text-sm text-green-600 font-medium">
                      ✓
                    </span>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
