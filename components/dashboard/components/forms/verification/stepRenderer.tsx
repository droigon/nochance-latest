"use client";

import React from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { useVerification } from "@/context/VerificationContext";
import IdentityVerificationForm from "./IdentityVerificationForm";
import BusinessInformationForm from "./BusinessInformationForm";

export default function StepRenderer({ stepId }: { stepId: string }) {
  const { markComplete, nextStep } = useVerification();

  switch (stepId.toUpperCase()) {
    case "PERSONAL":
      return <PersonalDetailsForm />;

    case "IDENTITY":
      return (
        <div>
          <IdentityVerificationForm />
          <button
            onClick={() => {
              markComplete("IDENTITY");
              nextStep();
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      );

    case "BUSINESS":
      return (
        <div>
          <BusinessInformationForm />
          <button
            onClick={() => {
              markComplete("BUSINESS");
              nextStep();
            }}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Continue
          </button>
        </div>
      );

    case "REVIEW":
      return <p>Review your information before submitting.</p>;

    default:
      return <p>Unknown step</p>;
  }
}
