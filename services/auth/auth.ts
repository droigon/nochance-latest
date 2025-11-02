import {
  SignupDTO,
  VerifyDTO,
  LoginDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  ResetPasswordVerifyDTO,
} from "@/dtos/auth.dto";
import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/utils/types/api";
import { AuthResponse } from "@/utils/types/auth";
import { API_ROUTES } from "../index";

export const AuthService = {
  async signup(data: SignupDTO): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(API_ROUTES.signup, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: LoginDTO): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(API_ROUTES.login, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async verify(data: VerifyDTO): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(API_ROUTES.verify, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  //password
  async forgotPassword(data: ForgotPasswordDTO): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(API_ROUTES.forgotPassword, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async resetPassword(data: ResetPasswordDTO): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(API_ROUTES.resetPassword, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async resetPasswordVerify(
    data: ResetPasswordVerifyDTO
  ): Promise<ApiResponse<null>> {
    return apiFetch<ApiResponse<null>>(API_ROUTES.resetPasswordVerify, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  async logout() {
    // apiFetch attaches credentials: "include" so server can clear HttpOnly cookies
    return fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      let json = null;
      try {
        json = await res.json();
      } catch {}
      if (!res.ok)
        throw new Error(json?.message || res.statusText || "Logout failed");
      return json;
    });
  },
  async me(): Promise<AuthResponse> {
    return apiFetch<AuthResponse>(API_ROUTES.me, {
      method: "GET",
    });
  },
};
