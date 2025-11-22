import { apiFetch } from "@/lib/api";
import { StandardResponse } from "@/utils/types/api";
import {
  BusinessProfile,
  BusinessSearchResponse,
  BusinessSuggestion,
} from "@/utils/types/business";
import { API_ROUTES } from "../index";

export type BusinessSearchParams = {
  query: string;
  limit?: number;
  page?: number;
  businessType?: string;
  verified?: boolean;
  location?: string;
};

export const BusinessService = {
  async getBusiness(
    businessId: string
  ): Promise<StandardResponse<BusinessProfile>> {
    const url = API_ROUTES.getBusiness(businessId);
    return apiFetch<StandardResponse<BusinessProfile>>(url, {
      method: "GET",
    });
  },

  async searchBusinesses(
    params: BusinessSearchParams
  ): Promise<StandardResponse<BusinessSearchResponse>> {
    const trimmedQuery = params.query?.trim() ?? "";
    const queryParam = trimmedQuery.length >= 3 ? trimmedQuery : undefined;

    const url = API_ROUTES.searchBusinesses({
      q: queryParam,
      limit: params.limit ? params.limit.toString() : undefined,
      page: params.page ? params.page.toString() : undefined,
      businessType: params.businessType,
      location: params.location,
      verified:
        typeof params.verified === "boolean"
          ? String(params.verified)
          : undefined,
    });

    return apiFetch<StandardResponse<BusinessSearchResponse>>(url, {
      method: "GET",
    });
  },

  async searchSuggestions(
    query: string,
    limit = 5,
    options?: { signal?: AbortSignal }
  ): Promise<StandardResponse<BusinessSuggestion[]>> {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) {
      return {
        success: true,
        message: "Skipped short query",
        data: [],
      };
    }

    const url = API_ROUTES.businessSuggestions(trimmedQuery, limit);
    return apiFetch<StandardResponse<BusinessSuggestion[]>>(url, {
      method: "GET",
      signal: options?.signal,
    });
  },
};
