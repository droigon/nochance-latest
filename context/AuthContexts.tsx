"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth/auth";
import { AuthCookieService } from "@/lib/auth-cookies";
import type {
  IUSER,
  AuthSuccessData,
  PermissionsMap,
  SessionData,
} from "@/utils/types/auth";
import type { Business } from "@/utils/types/business";

type AuthContextType = {
  user: IUSER | null;
  business: Business | null;
  loading: boolean;
  stats: Record<string, unknown> | null;
  permissions: PermissionsMap | null;
  session: SessionData | null;
  setUser: (
    u: IUSER | null,
    b?: Business | null,
    stats?: Record<string, unknown> | null,
    permissions?: PermissionsMap | null,
    session?: SessionData | null
  ) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; userRole?: string; message?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<IUSER | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [permissions, setPermissions] = useState<PermissionsMap | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Optimized hydration on first load
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hydrate = async () => {
      try {
        // Fast synchronous hydration first
        const cookieUser = AuthCookieService.getStoredUser();
        const localUser = localStorage.getItem("user");
        const localBiz = localStorage.getItem("business");

        if (
          cookieUser &&
          typeof cookieUser === "object" &&
          "id" in cookieUser
        ) {
          // Quick cookie hydration - use proper typing
          hydrateFromCookie(cookieUser as unknown as Record<string, unknown>);
        } else if (localUser) {
          // Fallback to localStorage
          try {
            setUserState(JSON.parse(localUser));
            if (localBiz) setBusiness(JSON.parse(localBiz));

            const localStats = localStorage.getItem("stats");
            const localPermissions = localStorage.getItem("permissions");
            const localSession = localStorage.getItem("session");
            if (localStats) setStats(JSON.parse(localStats));
            if (localPermissions) setPermissions(JSON.parse(localPermissions));
            if (localSession) setSession(JSON.parse(localSession));
          } catch (parseError) {
            console.warn("Failed to parse stored user:", parseError);
          }
        }

        setLoading(false); // Set loading false immediately after hydration

        // Background refresh only if we have tokens but no user data
        const hasToken =
          localStorage.getItem("token") ||
          document.cookie.includes("access_token");
        const hasUserData = cookieUser || localUser;

        if (hasToken && !hasUserData) {
          // Only refresh if we have auth but no user data
          setTimeout(refresh, 100); // Defer to next tick
        }
      } catch (error) {
        console.warn("Hydration failed:", error);
        setUserState(null);
        setBusiness(null);
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  /** Adapt cookie-stored user to IUSER/Business */
  const hydrateFromCookie = (cookieUser: Record<string, unknown>) => {
    if (!cookieUser || typeof cookieUser !== "object") return;

    // Type-safe getters with proper casting
    const getString = (value: unknown, fallback: string = ""): string => {
      return typeof value === "string" ? value : fallback;
    };

    const getBoolean = (value: unknown): boolean => {
      return Boolean(value);
    };

    const getUserRole = (value: unknown): "USER" | "VENDOR" | "ADMIN" => {
      const role = getString(value, "USER");
      return ["USER", "VENDOR", "ADMIN"].includes(role)
        ? (role as "USER" | "VENDOR" | "ADMIN")
        : "USER";
    };

    const getVendorType = (
      value: unknown
    ): "CREATOR" | "SME" | "ENTERPRISE" | undefined => {
      const vendor = getString(value);
      return ["CREATOR", "SME", "ENTERPRISE"].includes(vendor)
        ? (vendor as "CREATOR" | "SME" | "ENTERPRISE")
        : undefined;
    };

    const getBusinessType = (
      value: unknown
    ): "CREATOR" | "SME" | "ENTERPRISE" => {
      const type = getString(value, "CREATOR");
      return ["CREATOR", "SME", "ENTERPRISE"].includes(type)
        ? (type as "CREATOR" | "SME" | "ENTERPRISE")
        : "CREATOR";
    };

    const adaptedUser: IUSER = {
      id: getString(cookieUser.id),
      email: getString(cookieUser.email),
      name:
        getString(cookieUser.fullName) ||
        getString(cookieUser.name) ||
        getString(cookieUser.email)?.split("@")[0] ||
        "User",
      userRole: getUserRole(cookieUser.userRole),
      vendorType: getVendorType(cookieUser.vendorType),
      verified: getBoolean(cookieUser.verified),
      status: getBoolean(cookieUser.status),
      kyc:
        cookieUser.kyc && typeof cookieUser.kyc === "object"
          ? {
              id: getString((cookieUser.kyc as Record<string, unknown>).id),
              status: getString(
                (cookieUser.kyc as Record<string, unknown>).status,
                "NOT_SUBMITTED"
              ) as "PENDING" | "APPROVED" | "REJECTED" | "NOT_SUBMITTED",
              createdAt: new Date(
                (cookieUser.kyc as Record<string, unknown>).createdAt as string
              ),
              updatedAt: new Date(
                (cookieUser.kyc as Record<string, unknown>).updatedAt as string
              ),
              userId: getString(
                (cookieUser.kyc as Record<string, unknown>).userId
              ),
            }
          : null,
    };
    setUserState(adaptedUser);

    // hydrate stats, permissions, session if present
    if (cookieUser.stats) setStats(cookieUser.stats as Record<string, unknown>);
    if (cookieUser.permissions)
      setPermissions(cookieUser.permissions as PermissionsMap);
    if (cookieUser.session) setSession(cookieUser.session as SessionData);

    if (cookieUser.business && typeof cookieUser.business === "object") {
      const biz = cookieUser.business as Record<string, unknown>;
      const adaptedBusiness: Business = {
        id: getString(biz.id),
        name: getString(biz.name),
        businessType: getBusinessType(biz.businessType || biz.type),
        verified: getBoolean(biz.verified),
      };
      setBusiness(adaptedBusiness);
    }
  };

  /** Set user and persist */
  const setUser = (
    u: IUSER | null,
    b?: Business | null,
    s?: Record<string, unknown> | null,
    p?: PermissionsMap | null,
    sess?: SessionData | null
  ) => {
    setUserState(u);
    setBusiness(b || null);
    setStats(s || null);
    setPermissions(p || null);
    setSession(sess || null);

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

    if (s) localStorage.setItem("stats", JSON.stringify(s));
    else localStorage.removeItem("stats");

    if (p) localStorage.setItem("permissions", JSON.stringify(p));
    else localStorage.removeItem("permissions");

    if (sess) localStorage.setItem("session", JSON.stringify(sess));
    else localStorage.removeItem("session");
  };

  /** Refresh user session */
  const refresh = async () => {
    try {
      const res = await AuthService.me();
      if (!res.success || !res.data) {
        throw new Error("No valid session");
      }

      // the /me endpoint (and some login responses) may return an extended payload
      // with stats, permissions and session alongside user, business and token
      const {
        user: fetchedUser,
        business: fetchedBusiness,
        stats: fetchedStats,
        permissions: fetchedPermissions,
        session: fetchedSession,
      } = res.data as unknown as AuthSuccessData & {
        user?: IUSER;
        business?: Business;
      };

      if (fetchedUser) {
        setUserState(fetchedUser);
        setBusiness(fetchedBusiness || null);
        setStats(fetchedStats || null);
        setPermissions(fetchedPermissions || null);
        setSession(fetchedSession || null);

        localStorage.setItem("user", JSON.stringify(fetchedUser));
        if (fetchedBusiness)
          localStorage.setItem("business", JSON.stringify(fetchedBusiness));
        else localStorage.removeItem("business");

        if (fetchedStats)
          localStorage.setItem("stats", JSON.stringify(fetchedStats));
        else localStorage.removeItem("stats");

        if (fetchedPermissions)
          localStorage.setItem(
            "permissions",
            JSON.stringify(fetchedPermissions)
          );
        else localStorage.removeItem("permissions");

        if (fetchedSession)
          localStorage.setItem("session", JSON.stringify(fetchedSession));
        else localStorage.removeItem("session");
      }
    } catch (error) {
      console.warn("Refresh failed:", error);
      const hasStoredData =
        AuthCookieService.getStoredUser() || localStorage.getItem("user");
      if (!hasStoredData) {
        setUserState(null);
        setBusiness(null);
        setStats(null);
        setPermissions(null);
        setSession(null);
        localStorage.removeItem("user");
        localStorage.removeItem("business");
      }
    }
  };

  /** Logout user */
  const logout = async () => {
    try {
      //await AuthService.logout();
    } catch (error) {
      console.log("Server logout failed:", error);
    } finally {
      setUserState(null);
      setBusiness(null);
      setStats(null);
      setPermissions(null);
      setSession(null);
      AuthCookieService.clearAllAuthData();
      localStorage.clear();
      window.location.assign("/login");
    }
  };

  /** Login user */
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const loginRes = await AuthService.login(credentials);

      // Check for success response with data
      if (!loginRes.success || !("data" in loginRes) || !loginRes.data?.token) {
        const errorMessage = loginRes.success
          ? "Invalid login response"
          : loginRes.message;
        return { success: false, message: errorMessage };
      }

      const {
        token,
        user,
        business,
        stats: loginStats,
        permissions: loginPermissions,
        session: loginSession,
      } = loginRes.data as unknown as {
        token: string;
        user: IUSER | null;
        business?: Business | null;
        stats?: Record<string, unknown> | null;
        permissions?: PermissionsMap | null;
        session?: SessionData | null;
      };
      if (!user) {
        return { success: false, message: "Missing user data" };
      }

      // Optimized: Set all auth data in one batch
      const authData = {
        user: user as unknown as Record<string, unknown>,
        token,
        business: business as unknown as Record<string, unknown>,
      };
      console.log("user", user);

      // Batch cookie operations
      try {
        const cookieExpiry = 60 * 60 * 24 * 7; // 7 days
        const isSecure =
          typeof window !== "undefined" &&
          window.location.protocol === "https:";

        document.cookie = `access_token=${token}; path=/; max-age=${cookieExpiry}; SameSite=Lax${
          isSecure ? "; Secure" : ""
        }`;
        // create a single readable cookie payload so middleware/front-end can
        // quickly access user + small session info if needed (not a substitute
        // for HttpOnly cookies set by the server)
        const readable = JSON.stringify({
          user,
          business,
          stats: loginStats,
          permissions: loginPermissions,
          session: loginSession,
        });
        document.cookie = `user=${encodeURIComponent(
          readable
        )}; path=/; max-age=${cookieExpiry}; SameSite=Lax`;

        // Use AuthCookieService for additional cookies
        AuthCookieService.setAuthCookies(
          authData.user,
          token,
          authData.business
        );
      } catch (error) {
        console.warn("Cookie setting failed:", error);
      }

      // Batch localStorage operations
      try {
        const storageUpdates: Array<[string, string]> = [
          ["user", JSON.stringify(user)],
          ["token", token],
        ];
        if (business)
          storageUpdates.push(["business", JSON.stringify(business)]);
        if (loginStats)
          storageUpdates.push(["stats", JSON.stringify(loginStats)]);
        if (loginPermissions)
          storageUpdates.push([
            "permissions",
            JSON.stringify(loginPermissions),
          ]);
        if (loginSession)
          storageUpdates.push(["session", JSON.stringify(loginSession)]);

        storageUpdates.forEach(([key, value]) =>
          localStorage.setItem(key, value)
        );
        if (!business) localStorage.removeItem("business");
      } catch (error) {
        console.warn("localStorage update failed:", error);
      }

      // Single state update (including extended pieces)
      setUserState(user);
      setBusiness(business || null);
      setStats(loginStats || null);
      setPermissions(loginPermissions || null);
      setSession(loginSession || null);

      return {
        success: true,
        userRole: user.userRole,
        message: "Login successful",
      };
    } catch (error) {
      console.error("Login error:", error);
      const message = error instanceof Error ? error.message : "Login failed";
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        business,
        loading,
        stats,
        permissions,
        session,
        setUser,
        refresh,
        logout,
        login,
      }}
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
