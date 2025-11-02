// ...existing code...
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth/auth";

type User = {
  id?: string;
  email?: string;
  userRole?: string;
  vendorType?: string;
  [k: string]: any;
} | null;
type Business = {
  id?: string;
  businessType?: string;
  type?: string;
  [k: string]: any;
} | null;

type AuthContextType = {
  user: User;
  business: Business;
  loading: boolean;
  setUser: (u: User, b?: Business) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>(null);
  const [business, setBusiness] = useState<Business>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // hydrate quickly from localStorage then refresh from server
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUserState(JSON.parse(raw));
      const rawBiz = localStorage.getItem("business");
      if (rawBiz) setBusiness(JSON.parse(rawBiz));
    } catch {
      setUserState(null);
      setBusiness(null);
    }

    (async () => {
      await refresh();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUser = (u: User, b?: Business) => {
    setUserState(u);
    if (b !== undefined) setBusiness(b);
    try {
      if (u) localStorage.setItem("user", JSON.stringify(u));
      else localStorage.removeItem("user");
      if (b) localStorage.setItem("business", JSON.stringify(b));
      else if (b === null) localStorage.removeItem("business");
    } catch {}
  };

  const refresh = async () => {
    try {
      const res = await AuthService.me();
      if (!res.success) throw new Error("Failed to refresh user");
      const payload = res.data;
      const fetchedUser = payload?.user ?? payload;
      const fetchedBusiness = payload?.business ?? null;
      setUserState(fetchedUser ?? null);
      setBusiness(fetchedBusiness);
      try {
        if (fetchedUser)
          localStorage.setItem("user", JSON.stringify(fetchedUser));
        else localStorage.removeItem("user");
        if (fetchedBusiness)
          localStorage.setItem("business", JSON.stringify(fetchedBusiness));
        else localStorage.removeItem("business");
      } catch {}
    } catch (e) {
      setUserState(null);
      setBusiness(null);
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("business");
      } catch {}
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch {
      // ignore
    } finally {
      setUserState(null);
      setBusiness(null);
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("business");
        localStorage.removeItem("token");
        document.cookie = "user=; path=/; max-age=0";
      } catch {}
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
