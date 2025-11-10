export interface SignupDTO {
  email: string;
  password: string;
  UserRole: "USER" | "VENDOR";
  token?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface VerifyDTO {
  email: string;
  code: string;
}
export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  token: string;
  newPassword: string;
}

export interface ResetPasswordVerifyDTO {
  email: string;
  token: string;
}
export interface SendCodeDTO {
  email: string;
}

export interface VerifyCodeDTO {
  email: string;
  token: string;
}
