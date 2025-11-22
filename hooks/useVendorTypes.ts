// src/hooks/useVendorTypes.ts
//"use client";
//import { useEffect, useState } from "react";
//
///**
// * Simple hook that returns a vendor type string (or null) stored in localStorage.
// * Adjust this to read from app context, user profile, or query param as needed.
// */
//export function useVendorType(): string | null {
//  const [vendorType, setVendorType] = useState<string | null>(null);
//
//  useEffect(() => {
//    try {
//      const v = localStorage.getItem("businessType");
//      console.log("vendorType from localStorage:", v);
//      // default fallback for dev — change or remove in production
//      setVendorType(v ?? null);
//    } catch {
//      setVendorType(null);
//    }
//  }, []);
//
//  return vendorType;
//}

// ...existing code...
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContexts";

export function useVendorType() {
  const { user, business, loading: authLoading, refresh } = useAuth();
  const [vendorType, setVendorType] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem("vendorType");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(authLoading);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // compute vendorType from auth context when ready
    if (authLoading) {
      return;
    }

    try {
      const vt =
        (business && business.businessType) ??
        user?.vendorType ??
        null;
      setVendorType(vt ?? null);
      setError(null);
      try {
        if (vt) localStorage.setItem("vendorType", JSON.stringify(vt));
        else localStorage.removeItem("vendorType");
      } catch {}
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [authLoading, user, business, refresh]);

  return { vendorType, loading, error };
}
// ...existing code...
