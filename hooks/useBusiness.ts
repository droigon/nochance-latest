"use client";

import { useAuth } from "@/context/AuthContexts";
import { useQuery } from "@tanstack/react-query";

export function useBusiness() {
  const { business } = useAuth();

  const {
    data: businessData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["business", business?.id],
    queryFn: async () => {
      if (!business?.id) throw new Error("Missing business ID");
      const res = await fetch(`/api/v1/business/${business.id}`, {
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      const json = await res.json();
      return json.data ?? {};
    },
    enabled: !!business?.id, // only run when we have an ID
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return { businessData, isLoading, isError, refetch };
}
