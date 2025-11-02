import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/utils/types/api";
import { API_ROUTES } from "../index";
import { create } from "domain";

export const ReportService = {
  //async generateReport(businessId: string): Promise<ApiResponse<null>> {
  //    const url = API_ROUTES.generateReport(businessId);
  //    return await apiFetch(url, {
  //        method: "POST",
  //    });
  //},
  //async getReportStatus(businessId: string): Promise<ApiResponse<{ status: string }>> {
  //    const url = API_ROUTES.getReportStatus(businessId);
  //    return await apiFetch(url, {
  //        method: "GET",
  //    });
  //}
  //async downloadReport(businessId: string): Promise<ApiResponse<Blob>> {
  //    const url = API_ROUTES.downloadReport(businessId);
  //    return await apiFetch(url, {
  //        method: "GET",
  //    });
  //}
  async createReport(data: any): Promise<ApiResponse<any>> {
    const url = API_ROUTES.createReport();
    return await apiFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
