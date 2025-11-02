import {
  VerificationSubmissionDTO,
  BusinessDTO,
} from "@/dtos/verifications.dto";

import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/utils/types/api";
import { API_ROUTES } from "../index";

export const BusinessService = {
  // Pass businessId explicitly (keeps route building simple)

  async getBusiness(businessId: string): Promise<ApiResponse<BusinessDTO>> {
    const url = API_ROUTES.getBusiness(businessId);
    return apiFetch<ApiResponse<BusinessDTO>>(url, {
      method: "GET",
    });
  },
};
