import { useEffect, useState, useCallback, useMemo } from "react";
import { AuthService } from "@/services/auth/auth";
import { useAuth } from "@/context/AuthContexts";

export interface NormalizedStats {
  reviewsPosted: number;
  reportsSubmitted: number;
  trustedSellers: number;
}

export interface FreshStats {
  stats: NormalizedStats;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Normalize stats from any shape (flat or nested) to guaranteed numeric values
 */
function normalizeStats(
  rawStats: Record<string, unknown> | null
): NormalizedStats {
  if (!rawStats) {
    return { reviewsPosted: 0, reportsSubmitted: 0, trustedSellers: 0 };
  }

  const s = rawStats as Record<string, unknown>;

  // Extract reviewsPosted (simple number)
  const reviewsPosted =
    typeof s["reviewsPosted"] === "number" ? (s["reviewsPosted"] as number) : 0;

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
}

// Simple in-memory cache for stats with TTL
const statsCache = {
  data: null as Record<string, unknown> | null,
  timestamp: 0,
  TTL: 60000, // 60 seconds cache
  isValid() {
    return this.data && Date.now() - this.timestamp < this.TTL;
  },
  set(data: Record<string, unknown>) {
    this.data = data;
    this.timestamp = Date.now();
  },
  get() {
    return this.isValid() ? this.data : null;
  },
  clear() {
    this.data = null;
    this.timestamp = 0;
  },
};

/**
 * useStatsFresh - Fetch and normalize fresh stats from /me endpoint without using localStorage
 * Uses in-memory cache with 60s TTL to avoid unnecessary API calls
 */
export function useStatsFresh(): FreshStats {
  const { user } = useAuth();
  const [rawStats, setRawStats] = useState<Record<string, unknown> | null>(
    () => statsCache.get()
  );
  const [loading, setLoading] = useState(!statsCache.isValid());
  const [error, setError] = useState<string | null>(null);

  const stats = useMemo(() => normalizeStats(rawStats), [rawStats]);

  const fetchStats = useCallback(async () => {
    if (!user) {
      setRawStats(null);
      setLoading(false);
      return;
    }

    // Check cache first
    const cachedData = statsCache.get();
    if (cachedData) {
      setRawStats(cachedData);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await AuthService.me();

      // The /me endpoint returns AuthSuccessData which includes stats
      if (res.success && res.data) {
        const responseData = res.data as unknown as Record<string, unknown>;
        const statsData =
          (responseData.stats as Record<string, unknown>) ||
          (responseData.data &&
            (responseData.data as Record<string, unknown>).stats) ||
          null;
        if (statsData) {
          statsCache.set(statsData);
          setRawStats(statsData);
          setError(null);
        } else {
          setError("No stats available");
          setRawStats(null);
        }
      } else {
        setError(res.message || "Failed to fetch stats");
        setRawStats(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error fetching stats";
      setError(message);
      setRawStats(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch on mount and when user changes
  useEffect(() => {
    fetchStats();
  }, [user, fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
