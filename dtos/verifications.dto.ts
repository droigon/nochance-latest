export interface PersonalDTO {
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  whatsapp: string;
}

export interface BusinessDTO {
  name: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface BANK {
  id: string;
  name: string;
  code: string;
}
export interface BankAccountDTO {
  accountNumber: string;
  bankCode: string;
  account_name?: string;
}
export interface SocialDTO {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
}
export interface IdentityDTO {
  nin?: string;
  //ninVerified?: boolean;
  bvn?: string;
  //bvnVerified?: boolean;
}
export interface VerificationSubmissionDTO {
  category:
    | "PERSONAL"
    | "BUSINESS"
    | "IDENTITY"
    | "BANK_ACCOUNT"
    | "SOCIAL_MEDIA";
  documents:
    | PersonalDTO
    | BusinessDTO
    | IdentityDTO
    | BankAccountDTO
    | SocialDTO;
}

export interface VerificationVerifyDto {
  category: "IDENTITY" | "BANK_ACCOUNT";
  case: "NIN" | "BVN" | "BANK";
  value: string | BankAccountDTO;
}
