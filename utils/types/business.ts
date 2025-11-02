export interface Business {
  id: string;
  name?: string;
  businessType: "CREATOR" | "SME" | "ENTERPRISE";
  verified: boolean;
}
