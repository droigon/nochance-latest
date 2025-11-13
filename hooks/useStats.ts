import { useMemo } from "react";

export interface NormalizedStats {
  reviewsPosted: number;
  reportsSubmitted: number;
  trustedSellers: number;
}

/**
 * useStats - normalize and extract numeric stats
 * Handles nested or flat stats shapes and returns safe numeric values
 */
export function useStats(
  stats?: Record<string, unknown> | null
): NormalizedStats {
  return useMemo(() => {
    if (!stats) {
      return { reviewsPosted: 0, reportsSubmitted: 0, trustedSellers: 0 };
    }

    const s = stats as Record<string, unknown>;

    // Extract reviewsPosted (simple number)
    const reviewsPosted =
      typeof s["reviewsPosted"] === "number"
        ? (s["reviewsPosted"] as number)
        : 0;

    // Extract reportsSubmitted (can be number or nested object)
    const reportsSubmittedVal = s["reportsSubmitted"];
    let reportsSubmitted = 0;
    if (typeof reportsSubmittedVal === "number") {
      reportsSubmitted = reportsSubmittedVal as number;
    } else if (reportsSubmittedVal && typeof reportsSubmittedVal === "object") {
      const r = reportsSubmittedVal as Record<string, unknown>;
      reportsSubmitted =
        typeof r["reportCount"] === "number"
          ? (r["reportCount"] as number)
          : typeof r["reviewCount"] === "number"
          ? (r["reviewCount"] as number)
          : 0;
    }

    // Extract trustedSellers (can be number or nested object)
    const trustedVal = s["trustedSellers"];
    let trustedSellers = 0;
    if (typeof trustedVal === "number") {
      trustedSellers = trustedVal as number;
    } else if (trustedVal && typeof trustedVal === "object") {
      const t = trustedVal as Record<string, unknown>;
      trustedSellers =
        typeof t["trustedSellerCount"] === "number"
          ? (t["trustedSellerCount"] as number)
          : typeof t["reviewCount"] === "number"
          ? (t["reviewCount"] as number)
          : 0;
    }

    return { reviewsPosted, reportsSubmitted, trustedSellers };
  }, [stats]);
}
