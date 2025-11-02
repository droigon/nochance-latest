// src/hooks/useVerificationSteps.ts
import { useMemo, useRef } from "react";
import { steps, Step } from "@/utils/constants/vendorSteps";
import { toast } from "react-toastify";

// ✅ Define step map globally since `steps` doesn’t change
const stepMap: Map<string, Step> = new Map(
  steps.map((s) => [s.id.toUpperCase(), s])
);

// ✅ Normalize vendor steps once
const vendorSteps: Record<string, string[]> = {
  CREATOR: ["PERSONAL", "SOCIAL", "IDENTITY", "BANK", "LIVENESS"],
  SME: ["PERSONAL", "BUSINESS", "SOCIAL", "IDENTITY", "BANK", "LIVENESS"],
  ENTERPRISE: ["CAC"],
};

const normalizedVendorSteps = Object.entries(vendorSteps).reduce(
  (acc, [key, ids]) => {
    acc[key.toUpperCase()] = ids.map((id) => id.toUpperCase());
    return acc;
  },
  {} as Record<string, string[]>
);

export function useVerificationSteps(vendorType: string | null): Step[] {
  const toastShown = useRef(false);

  return useMemo(() => {
    if (!vendorType) {
      if (!toastShown.current) {
        toast.error("No vendorType provided, returning empty steps.");
        toastShown.current = true;
      }
      return [];
    }

    const key = vendorType.toUpperCase();
    const ids =
      normalizedVendorSteps[key] ?? normalizedVendorSteps["SME"] ?? [];

    // ✅ Use precomputed map for O(1) lookups
    return ids.map((id) => stepMap.get(id)).filter(Boolean) as Step[];
  }, [vendorType]);
}
