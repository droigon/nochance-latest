import type { ApiResult } from "./api";
import type { Business } from "./business";
import type { IKYC } from "./kyc";
// auth-specific payload

export interface IUSER {
  id: string;
  userRole: "USER" | "VENDOR" | "ADMIN"; // Match backend casing
  email: string;
  name: string;
  verified: boolean;
  status: boolean;
  country?: string;
  picture?: string;
  kyc: IKYC | null;

  vendorType?: "CREATOR" | "SME" | "ENTERPRISE"; // only for vendors
}

export interface AuthPayload {
  token: string;
  user: IUSER;
  business?: Business | null; // for VENDORs, this will be their business info
}

export type PermissionsMap = Record<string, boolean>;
export type SessionData = Record<string, unknown>;

export interface AuthSuccessData {
  user: IUSER;
  business?: Business | null;
  stats: Record<string, unknown>;
  permissions: PermissionsMap;
  session: SessionData;
}

// auth response is just ApiResult<AuthPayload>
export type AuthResponse = ApiResult<AuthPayload>;
