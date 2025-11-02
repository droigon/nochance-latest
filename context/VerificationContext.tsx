"use client";

import React, { createContext, useContext, useState } from "react";

type Step = "personal" | "identity" | "business";

interface VerificationContextType {
  steps: Step[];
  currentStep: Step;
  markComplete: (step: Step) => void;
  completed: Record<Step, boolean>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: Step) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export function VerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps: Step[] = ["personal", "identity", "business"];
  const markComplete = (step: Step) => {
    setCompleted((prev) => ({ ...prev, [step]: true }));
  };
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [completed, setCompleted] = useState<Record<Step, boolean>>({
    personal: false,
    identity: false,
    business: false,
  });

  const nextStep = () => {
    const index = steps.indexOf(currentStep);
    setCompleted((prev) => ({ ...prev, [currentStep]: true }));
    if (index < steps.length - 1) setCurrentStep(steps[index + 1]);
  };

  const prevStep = () => {
    const index = steps.indexOf(currentStep);
    if (index > 0) setCurrentStep(steps[index - 1]);
  };

  const goToStep = (step: Step) => setCurrentStep(step);

  return (
    <VerificationContext.Provider
      value={{
        steps,
        markComplete,
        currentStep,
        completed,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const ctx = useContext(VerificationContext);
  if (!ctx)
    throw new Error(
      "useVerification must be used inside <VerificationProvider>"
    );
  return ctx;
}
