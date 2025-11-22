import {
  VerificationSubmissionDTO,
  BusinessDTO,
  VerificationVerifyDto,
} from "@/dtos/verifications.dto";

import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/utils/types/api";
import { API_ROUTES } from "../index";

export const VerificationService = {
  // Pass businessId explicitly (keeps route building simple)
  async savePersonal(
    businessId: string,
    data: VerificationSubmissionDTO
  ): Promise<ApiResponse<null>> {
    console.log("Saving personal data for:", businessId, data);
    if (!data.category || !data.documents) {
      throw new Error("Invalid category for savePersonal");
    }
    const url = API_ROUTES.savePersonal(businessId);
    return apiFetch<ApiResponse<null>>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async save(
    businessId: string,
    data: VerificationSubmissionDTO
  ): Promise<ApiResponse<null>> {
    console.log("Saving personal data for:", businessId, data);
    if (!data.category || !data.documents) {
      throw new Error("Invalid category for savePersonal");
    }
    const url = API_ROUTES.savePersonal(businessId);
    return apiFetch<ApiResponse<null>>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getBusiness(businessId: string): Promise<ApiResponse<BusinessDTO>> {
    const url = API_ROUTES.getBusiness(businessId);
    return apiFetch<ApiResponse<BusinessDTO>>(url, {
      method: "GET",
    });
  },

  async verifyVerification(
    businessId: string,
    data: VerificationVerifyDto
  ): Promise<ApiResponse<unknown>> {
    const url = API_ROUTES.verifyBusiness(businessId);
    if (!data.category || !data.case || !data.value) {
      throw new Error("Invalid data for verifyVerification");
    }
    return apiFetch<ApiResponse<unknown>>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async getStatus(
    businessId: string,
    vendorType: string
  ): Promise<ApiResponse<unknown>> {
    const url = API_ROUTES.getStatus(businessId, vendorType);
    return apiFetch<ApiResponse<unknown>>(url, {
      method: "GET",
    });
  },

  async markStepComplete(
    businessId: string,
    stepId: string,
    vendorType: string,
    formData?: Record<string, unknown>
  ): Promise<ApiResponse<unknown>> {
    const url = API_ROUTES.markStepComplete(businessId, stepId);
    return apiFetch<ApiResponse<unknown>>(url, {
      method: "POST",
      body: JSON.stringify({ vendorType, formData }),
    });
  },
};
