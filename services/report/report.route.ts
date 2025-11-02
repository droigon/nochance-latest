export const REPORT_ROUTES = {
  // functions that build the final URL (replace :reportId)
  getReport: (reportId: string) =>
    `/api/v1/report/${encodeURIComponent(reportId)}`,
  createReport: () => `/api/v1/report/submits`,
  updateReport: (reportId: string) =>
    `/api/v1/report/${encodeURIComponent(reportId)}/update`,
  deleteReport: (reportId: string) =>
    `/api/v1/report/${encodeURIComponent(reportId)}/delete`,
};
