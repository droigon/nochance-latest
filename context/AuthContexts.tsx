// ...existing code...
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth/auth";
import { AuthCookieService } from "@/lib/auth-cookies";
import type { User } from "@/utils/types/auth";
import type { Business } from "@/utils/types/business";

type AuthContextType = {
  user: User | null;
  business: Business | null;
  loading: boolean;
  setUser: (u: User | null, b?: Business | null) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // hydrate quickly from cookies (set by middleware) then localStorage as fallback
    if (typeof window === "undefined") {
      return;
    }
    try {
      const cookieUser = AuthCookieService.getStoredUser();
      console.log("Hydrating user from cookie:", cookieUser);

      if (cookieUser) {
        // Try to adapt the cookie user data to our User type
        if ("id" in cookieUser && cookieUser.id && "email" in cookieUser) {
          const adaptedUser: User = {
            id: cookieUser.id as string,
            email: cookieUser.email as string,
            fullName:
              ("fullName" in cookieUser &&
              typeof cookieUser.fullName === "string"
                ? cookieUser.fullName
                : "") ||
              ("name" in cookieUser && typeof cookieUser.name === "string"
                ? cookieUser.name
                : "") ||
              cookieUser.email || // Fallback to email if name is empty
              "User",
            userRole: (cookieUser.userRole as User["userRole"]) || "USER",
            vendorType: cookieUser.vendorType as User["vendorType"],
          };
          setUserState(adaptedUser);

          if (cookieUser.business && typeof cookieUser.business === "object") {
            const biz = cookieUser.business as Record<string, unknown>;
            if (biz.id && typeof biz.id === "string") {
              const adaptedBusiness: Business = {
                id: biz.id,
                name: typeof biz.name === "string" ? biz.name : undefined,
                businessType:
                  (biz.businessType as Business["businessType"]) ||
                  (biz.type as Business["businessType"]) ||
                  "CREATOR",
                verified:
                  typeof biz.verified === "boolean" ? biz.verified : false,
              };
              setBusiness(adaptedBusiness);
            }
          }
        }
      } else {
        // Fallback to localStorage
        const raw = localStorage.getItem("user");
        if (raw) {
          const parsedUser = JSON.parse(raw);
          setUserState(parsedUser);
        }
        const rawBiz = localStorage.getItem("business");
        if (rawBiz) setBusiness(JSON.parse(rawBiz));
      }
    } catch {
      setUserState(null);
      setBusiness(null);
    }

    (async () => {
      // Only refresh if we don't have any stored user data
      const hasStoredData =
        AuthCookieService.getStoredUser() || localStorage.getItem("user");
      if (!hasStoredData) {
        await refresh();
      }
      setLoading(false);
    })();
  }, []);

  const setUser = (u: User | null, b?: Business | null) => {
    setUserState(u);
    setBusiness(b || null);

    // Update localStorage for persistence
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
      AuthCookieService.clearAuthCookies();
    }
    if (b) {
      localStorage.setItem("business", JSON.stringify(b));
    } else {
      localStorage.removeItem("business");
    }
  };

  const refresh = async () => {
    try {
      const res = await AuthService.me();
      if (!res.success) {
        // Only clear user if there's no valid cookie/localStorage data
        const hasStoredData =
          AuthCookieService.getStoredUser() || localStorage.getItem("user");
        if (!hasStoredData) {
          throw new Error("Failed to refresh user and no stored data");
        }
        return;
      }
      const payload = res.data;
      console.log("Auth refresh payload:", payload);
      const fetchedUser = payload?.user ?? payload;
      const fetchedBusiness = payload?.business ?? null;

      // Only update state if we got valid user data
      if (fetchedUser) {
        setUserState(fetchedUser);
        setBusiness(fetchedBusiness);
        try {
          localStorage.setItem("user", JSON.stringify(fetchedUser));
          if (fetchedBusiness)
            localStorage.setItem("business", JSON.stringify(fetchedBusiness));
          else localStorage.removeItem("business");
        } catch {}
      }
    } catch {
      // Only clear user if there's no valid cookie/localStorage data
      const hasStoredData =
        AuthCookieService.getStoredUser() || localStorage.getItem("user");
      if (!hasStoredData) {
        setUserState(null);
        setBusiness(null);
        try {
          localStorage.removeItem("user");
          localStorage.removeItem("business");
        } catch {}
      }
    }
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint to invalidate the token server-side
      await AuthService.logout();
    } catch (error) {
      // Continue with logout even if server call fails
      console.log(
        "Server logout failed, continuing with client cleanup:",
        error
      );
    } finally {
      // Clear all client-side state
      setUserState(null);
      setBusiness(null);

      // Nuclear option - clear absolutely everything
      AuthCookieService.clearAllAuthData();

      // Force a page reload to ensure clean state and redirect to login
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, business, loading, setUser, refresh, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
// ...existing code...
