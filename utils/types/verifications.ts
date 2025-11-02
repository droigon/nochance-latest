export interface PersonalDetails {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  whatsapp: string;
}

export interface BusinessDetails {
  id: string;
  name: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export type VerificationDetails = {
  personal?: PersonalDetails;
  business?: BusinessDetails;
};

export type VerificationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export interface Verification {
  id: string;
  userId: string;
  status: VerificationStatus;
  details: VerificationDetails;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVerificationDTO {
  userId: string;
}

export interface UpdatePersonalDetailsDTO {
  firstname: string;
  lastname: string;
  phone: string;
  dateOfBirth: string; // ISO date string
  address: string;
  whatsapp: string;
}

export interface UpdateBusinessDetailsDTO {
  name: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface SubmitVerificationDTO {
  verificationId: string;
  personalDetails?: UpdatePersonalDetailsDTO;
  businessDetails?: UpdateBusinessDetailsDTO;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  verification?: Verification;
}

export interface VerificationsListResponse {
  success: boolean;
  verifications: Verification[];
  total: number;
  page: number;
  pageSize: number;
}

export interface VerificationSteps {
  id: string;
  title: string;
  description: string;
}
