import { IUSER } from "@/utils/types/auth";

// Utility functions for cookie management
export class CookieManager {
  static setCookie(
    name: string,
    value: string,
    options: {
      maxAge?: number;
      path?: string;
      sameSite?: "Lax" | "Strict" | "None";
      secure?: boolean;
      httpOnly?: boolean;
    } = {}
  ) {
    const {
      maxAge = 60 * 60 * 24 * 7, // 7 days default
      path = "/",
      sameSite = "Lax",
      secure = location.protocol === "https:",
      httpOnly = false,
    } = options;

    let cookieString = `${name}=${value}; path=${path}; max-age=${maxAge}; SameSite=${sameSite}`;

    if (secure) {
      cookieString += "; Secure";
    }

    if (httpOnly) {
      cookieString += "; HttpOnly";
    }

    document.cookie = cookieString;
  }

  static deleteCookie(name: string, path: string = "/") {
    // Try multiple approaches to ensure cookie is deleted
    const deleteConfigs = [
      `${name}=; path=${path}; max-age=0`,
      `${name}=; path=${path}; max-age=0; SameSite=Lax`,
      `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`,
    ];

    deleteConfigs.forEach((config) => {
      document.cookie = config;
    });

    // Also try deleting from root path if not already root
    if (path !== "/") {
      document.cookie = `${name}=; path=/; max-age=0`;
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  static getCookie(name: string): string | null {
    if (typeof document === "undefined") {
      return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }
}

// Types for auth data (flexible to work with existing types)

type AuthBusiness = {
  id?: string;
  name?: string;
  businessType?: string;
  type?: string;
  verified?: boolean;
  [key: string]: unknown;
};

// Enhanced auth service for better cookie management
export class AuthCookieService {
  static setAuthCookies(
    user: IUSER | Record<string, unknown>,
    token: string,
    business?: AuthBusiness | Record<string, unknown>
  ) {
    try {
      // Set access token cookie
      CookieManager.setCookie("access_token", token);

      // Set user data cookie for middleware quick check
      const userData = { ...user, business };
      CookieManager.setCookie(
        "user",
        encodeURIComponent(JSON.stringify(userData))
      );

      // Also store in localStorage as fallback
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to set auth cookies:", error);
    }
  }

  static clearAuthCookies() {
    try {
      // Clear all auth-related cookies
      CookieManager.deleteCookie("access_token");
      CookieManager.deleteCookie("user");

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("business");

      // Clear any other potential auth storage
      localStorage.removeItem("access_token");

      console.log("Auth cookies and storage cleared successfully");
    } catch (error) {
      console.error("Failed to clear auth cookies:", error);
    }
  }

  static getStoredUser(): (IUSER & { business?: AuthBusiness }) | null {
    try {
      const userCookie = CookieManager.getCookie("user");
      if (userCookie) {
        return JSON.parse(decodeURIComponent(userCookie));
      }

      // Fallback to localStorage
      const userLocal = localStorage.getItem("user");
      return userLocal ? JSON.parse(userLocal) : null;
    } catch {
      return null;
    }
  }

  static getStoredToken(): string | null {
    try {
      return (
        CookieManager.getCookie("access_token") || localStorage.getItem("token")
      );
    } catch {
      return null;
    }
  }

  // Nuclear option - clear everything related to authentication
  static clearAllAuthData() {
    try {
      console.log("🧹 Starting complete auth data cleanup...");

      // Clear all known auth-related cookies
      const authCookies = [
        "access_token",
        "user",
        "token",
        "refresh_token",
        "session",
      ];
      authCookies.forEach((cookieName) => {
        CookieManager.deleteCookie(cookieName);
        console.log(`Cleared cookie: ${cookieName}`);
      });

      // Clear all known auth-related localStorage items
      const authLocalStorageKeys = [
        "token",
        "user",
        "business",
        "access_token",
        "refresh_token",
        "auth_user",
        "auth_token",
      ];
      authLocalStorageKeys.forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
        console.log(`Cleared storage: ${key}`);
      });

      console.log("✅ Complete auth data cleanup finished");
    } catch (error) {
      console.error("❌ Failed to clear all auth data:", error);
    }
  }
}
