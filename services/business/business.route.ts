type SearchParams = {
  q?: string;
  businessType?: string;
  verified?: string;
  location?: string;
  page?: string;
  limit?: string;
};

const buildQueryString = (
  params: Record<string, string | undefined | null>
) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const BUSINESS_ROUTES = {
  getBusiness: (businessId: string) =>
    `/api/v1/business/${encodeURIComponent(businessId)}`,
  searchBusinesses: (params: SearchParams = {}) =>
    `/api/v1/business/search${buildQueryString(params)}`,
  businessSuggestions: (query: string, limit?: number) =>
    `/api/v1/business/suggestions${buildQueryString({
      query,
      limit: limit ? String(limit) : undefined,
    })}`,
};
