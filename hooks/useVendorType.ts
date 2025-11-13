import { useAuth } from "@/context/AuthContexts";

export function useVendorType() {
  const { business } = useAuth();
  const loading = false;
  const vendorType = business?.businessType ?? null;
  const isVerified = business?.verified ?? false;
  return { vendorType, isVerified, loading };
}
