import type { ApiResult } from "./api";
import type { Business } from "./business";
// auth-specific payload
export interface User {
  id: string;
  userRole: "USER" | "VENDOR" | "ADMIN"; // Match backend casing
  email: string;
  fullName: string;
  verified: boolean;
  status: boolean;
  country?: string;
  picture?: string;
  kyc?: { id: string; status: string };

  vendorType?: "CREATOR" | "SME" | "ENTERPRISE"; // only for vendors
}

export interface AuthPayload {
  token: string;
  user: User;
  business?: Business | null; // for VENDORs, this will be their business info
}

// auth response is just ApiResult<AuthPayload>
export type AuthResponse = ApiResult<AuthPayload>;
