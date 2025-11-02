import { AUTH_ROUTES } from "./auth/auth.route";
import { VERIFICATION_ROUTES } from "./verifications/verification.route";
import { REPORT_ROUTES } from "./report/report.route";
import { BLOG_ROUTES } from "./blog/blog.route";

export const API_ROUTES = {
  ...AUTH_ROUTES,
  ...VERIFICATION_ROUTES,
  ...REPORT_ROUTES,
  ...BLOG_ROUTES,
};
