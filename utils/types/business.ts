export interface Business {
  id: string;
  name?: string;
  businessType: "CREATOR" | "SME" | "ENTERPRISE";
  verified: boolean;
}

export interface BusinessVerificationDetails {
  name?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  number?: string | null;
  tin?: string | null;
  type?: string | null;
  status?: string | null;
  logoUrl?: string | null;
}

export interface BankVerificationDetails {
  accountNumber?: string | null;
  bankCode?: string | null;
  verifiedName?: string | null;
}

export interface SocialVerificationDetails {
  instagram?: string | null;
  whatsapp?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  telegram?: string | null;
  x?: string | null;
}

export interface VerificationBundle {
  businessVerification?: BusinessVerificationDetails | null;
  personalVerification?: {
    firstname?: string | null;
    lastname?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
  } | null;
  identityVerification?: Record<string, unknown> | null;
  socialMediaVerification?: SocialVerificationDetails | null;
  bankAccountVerification?: BankVerificationDetails | null;
  addressVerification?: {
    address?: string | null;
  } | null;
}

export interface BusinessProfile {
  id: string;
  ownerUserId?: string;
  businessType?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  verification?: VerificationBundle | null;
  _count?: {
    reviews?: number;
  };
}

export interface BusinessSuggestion {
  id: string;
  name: string | null;
  website?: string | null;
}

export interface BusinessSearchResponse {
  items: BusinessProfile[];
  total: number;
  page: number;
  limit: number;
  filters: {
    q?: string;
    businessType?: string;
    verified?: boolean;
    location?: string;
  };
}
