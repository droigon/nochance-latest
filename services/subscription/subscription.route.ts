export const SUBSCRIPTION_ROUTES = {
  getSubscription: (businessId: string) => `/api/v1/subscription/${businessId}`,
  createSubscription: () => `/api/v1/subscription`,
  cancelSubscription: (businessId: string) =>
    `/api/v1/subscription/${businessId}/cancel`,
};

