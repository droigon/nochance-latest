"use client";

import React from "react";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { StepId } from "@/context/VerificationContext";

interface VerificationStepItemProps {
  stepId: StepId;
  label: string;
  description: string;
  completed: boolean;
  isActive: boolean;
  isAvailable: boolean;
  href: string;
  index: number;
  total: number;
}

const STEP_LABELS: Record<StepId, { label: string; description: string }> = {
  PERSONAL: {
    label: "Personal Information",
    description: "Enter your personal details",
  },
  SOCIAL: {
    label: "Social Media",
    description: "Connect your social media accounts",
  },
  BUSINESS: {
    label: "Business Details",
    description: "Provide your business information",
  },
  IDENTITY: {
    label: "Identity Verification",
    description: "Verify your identity with NIN or BVN",
  },
  BANK: {
    label: "Bank Account",
    description: "Connect your bank account",
  },
  LIVENESS: {
    label: "Liveness Check",
    description: "Take a photo for verification",
  },
  PRODUCT_COMPLIANCE: {
    label: "Product Compliance",
    description: "Compliance details for your products",
  },
  ADDRESS: {
    label: "Address Verification",
    description: "Verify your address",
  },
};

export function VerificationStepItem({
  stepId,
  completed,
  isActive,
  isAvailable,
  href,
  index,
  total,
}: VerificationStepItemProps) {
  const { label, description } = STEP_LABELS[stepId];

  return (
    <Link href={href}>
      <div
        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
          completed
            ? "border-green-500 bg-green-50"
            : isActive
              ? "border-blue-500 bg-blue-50"
              : isAvailable
                ? "border-gray-200 bg-white hover:border-blue-300"
                : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-500">
                Step {index + 1} of {total}
              </span>
              {completed && <Check className="w-4 h-4 text-green-600" />}
              {!isAvailable && !completed && (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <h3 className="font-semibold text-lg mt-1">{label}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>

          {completed && (
            <div className="ml-2 flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {isActive && !completed && (
          <div className="mt-3 text-xs font-semibold text-blue-600">
            In Progress →
          </div>
        )}
      </div>
    </Link>
  );
}
