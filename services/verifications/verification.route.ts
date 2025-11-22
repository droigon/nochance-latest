export const VERIFICATION_ROUTES = {
  // functions that build the final URL (replace :businessId)
  savePersonal: (businessId: string) =>
    `/api/v1/verification/${encodeURIComponent(businessId)}/submit`,
  saveBusiness: (businessId: string) =>
    `/api/v1/verification/${encodeURIComponent(businessId)}/submit`,
  getBusiness: (businessId: string) =>
    `/api/v1/verification/${encodeURIComponent(businessId)}/business`,
  verifyBusiness: (businessId: string) =>
    `/api/v1/verification/${encodeURIComponent(businessId)}/verify`,
  getStatus: (businessId: string, vendorType: string) =>
    `/api/v1/verification/${encodeURIComponent(
      businessId
    )}/status?vendorType=${encodeURIComponent(vendorType)}`,
  markStepComplete: (businessId: string, stepId: string) =>
    `/api/v1/verification/${encodeURIComponent(
      businessId
    )}/${encodeURIComponent(stepId)}/mark-complete`,
};
