export const VERIFICATION_ROUTES = {
  getBusiness: (businessId: string) =>
    `/api/v1/business/${encodeURIComponent(businessId)}/business`,
};
