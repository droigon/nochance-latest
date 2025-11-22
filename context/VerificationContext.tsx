"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContexts";

import { VerificationService } from "@/services/verifications/verifications";

// Step ID constants - matches backend
export type StepId =
  | "PERSONAL"
  | "SOCIAL"
  | "BUSINESS"
  | "IDENTITY"
  | "BANK"
  | "LIVENESS"
  | "PRODUCT_COMPLIANCE"
  | "ADDRESS";

export type VendorType = "CREATOR" | "SME" | "ENTERPRISE";

interface VerificationStep {
  id: string;
  stepId: StepId;
  completed: boolean;
  completedAt: string | null;
}

interface VerificationStatus {
  totalSteps: number;
  completedSteps: number;
  completionPercentage: number;
  steps: VerificationStep[];
}

interface VerificationContextType {
  status: VerificationStatus | null;
  loading: boolean;
  error: string | null;
  vendorType: VendorType | null;
  currentStep: StepId | null;
  markComplete: (
    stepId: StepId,
    formData?: Record<string, unknown>
  ) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepId: StepId) => void;
  refetch: () => Promise<void>;
  getStepOrder: () => StepId[];
}

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

// Step order per vendor type
const STEP_ORDER: Record<VendorType, StepId[]> = {
  CREATOR: ["PERSONAL", "IDENTITY", "SOCIAL", "BANK", "LIVENESS"],
  SME: ["PERSONAL", "SOCIAL", "IDENTITY", "BUSINESS", "BANK", "LIVENESS"],
  ENTERPRISE: ["PRODUCT_COMPLIANCE"],
};

const CACHE_KEY = "verification_status_cache";

function getCachedStatus(businessId: string): VerificationStatus | null {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const cacheData = JSON.parse(cache);
    if (cacheData.businessId === businessId) {
      const cacheTime = new Date(cacheData.timestamp).getTime();
      const now = new Date().getTime();
      // Cache valid for 5 minutes
      if (now - cacheTime < 5 * 60 * 1000) {
        return cacheData.status;
      }
    }
  } catch (e) {
    console.error("Failed to read verification cache:", e);
  }
  return null;
}

function setCachedStatus(businessId: string, status: VerificationStatus) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        businessId,
        status,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (e) {
    console.error("Failed to cache verification status:", e);
  }
}

export function VerificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { business } = useAuth();
  const businessId = business?.id;
  const vendorType = (business?.businessType as VendorType) || null;

  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId | null>(null);

  const getStepOrder = useCallback(() => {
    if (!vendorType) return [];
    return STEP_ORDER[vendorType];
  }, [vendorType]);

  // Fetch status from backend
  const refetch = useCallback(async () => {
    if (!businessId || !vendorType) {
      setLoading(false);
      setStatus(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCachedStatus(businessId);
      if (cached) {
        setStatus(cached);
        setCurrentStep(getStepOrder()[0] || null);
      }

      // Fetch fresh data
      console.log("Fetching verification status for:", businessId, vendorType);
      const response = await VerificationService.getStatus(
        businessId,
        vendorType
      );
      //const response = await fetch(
      //  `http://localhost:2000/api/v1/verification/${businessId}/status?vendorType=${vendorType}`,
      //  {
      //    method: "GET",
      //    headers: { "Content-Type": "application/json" },
      //    credentials: "include",
      //  }
      //);

      if (response.success !== true) {
        throw new Error("Failed to fetch verification status");
      }

      const newStatus = response.data as VerificationStatus;

      setStatus(newStatus);
      setCachedStatus(businessId, newStatus);

      // Set to first incomplete step
      const firstIncomplete = newStatus.steps.find(
        (s: VerificationStep) => !s.completed
      );
      setCurrentStep(firstIncomplete?.stepId || (getStepOrder()[0] ?? null));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to fetch status";
      setError(message);
      console.error("Verification status fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [businessId, vendorType, getStepOrder]);

  // Mark step complete
  const markComplete = useCallback(
    async (stepId: StepId, formData?: Record<string, unknown>) => {
      if (!businessId || !vendorType) {
        throw new Error("Business information not available");
      }

      try {
        console.log("📝 Marking step complete:", {
          businessId,
          stepId,
          vendorType,
          formData,
        });

        const response = await VerificationService.markStepComplete(
          businessId,
          stepId,
          vendorType,
          formData
        );

        console.log("🔄 markComplete response:", response);

        if (!response.success) {
          throw new Error("Failed to mark step complete");
        }

        // Refetch status to update UI
        console.log("🔄 Refetching verification status...");
        await refetch();
        console.log("✅ Status refetched successfully");
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Failed to mark step complete";
        setError(message);
        throw e;
      }
    },
    [businessId, vendorType, refetch]
  );

  // Navigation
  const nextStep = useCallback(() => {
    if (!currentStep || !status) return;

    const stepOrder = getStepOrder();
    const index = stepOrder.indexOf(currentStep);
    if (index < stepOrder.length - 1) {
      setCurrentStep(stepOrder[index + 1]);
    }
  }, [currentStep, status, getStepOrder]);

  const prevStep = useCallback(() => {
    if (!currentStep || !status) return;

    const stepOrder = getStepOrder();
    const index = stepOrder.indexOf(currentStep);
    if (index > 0) {
      setCurrentStep(stepOrder[index - 1]);
    }
  }, [currentStep, status, getStepOrder]);

  const goToStep = useCallback((stepId: StepId) => {
    setCurrentStep(stepId);
  }, []);

  // Fetch on mount and when business changes
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <VerificationContext.Provider
      value={{
        status,
        loading,
        error,
        vendorType,
        currentStep,
        markComplete,
        nextStep,
        prevStep,
        goToStep,
        refetch,
        getStepOrder,
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
