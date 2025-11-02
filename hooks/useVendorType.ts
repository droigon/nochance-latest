import { useAuth } from "@/context/AuthContext";

export function useVendorType() {
  const { user } = useAuth();
  const loading = false;
  const vendorType = (user as any)?.business?.businessType ?? null;
  const isVerified = (user as any)?.business?.verified ?? false;
  return { vendorType, isVerified, loading };
}
