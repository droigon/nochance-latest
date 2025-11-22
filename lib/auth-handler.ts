/**
 * Global authentication handler
 * Provides centralized logout functionality that can be called from anywhere
 * including utility functions like apiFetch
 */

import { AuthCookieService } from "./auth-cookies";

type LogoutCallback = () => Promise<void> | void;

let globalLogoutCallback: LogoutCallback | null = null;

/**
 * Register the logout callback from AuthContext
 * This should be called once when AuthProvider mounts
 */
export function registerLogoutHandler(callback: LogoutCallback) {
  globalLogoutCallback = callback;
}

/**
 * Unregister the logout callback
 * Should be called when AuthProvider unmounts
 */
export function unregisterLogoutHandler() {
  globalLogoutCallback = null;
}

/**
 * Global logout function that can be called from anywhere
 * Clears all auth data and redirects to login
 */
export async function handleGlobalLogout() {
  // Clear all auth data immediately
  try {
    AuthCookieService.clearAllAuthData();
    localStorage.clear();
    
    // Clear cookies
    document.cookie = "user=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  } catch (error) {
    console.error("Failed to clear auth data:", error);
  }

  // Call the registered logout callback if available
  if (globalLogoutCallback) {
    try {
      await globalLogoutCallback();
    } catch (error) {
      console.error("Logout callback failed:", error);
    }
  }

  // Redirect to login page
  // Use window.location.assign to ensure full page reload and clear state
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    const loginUrl = currentPath.startsWith("/dashboard")
      ? "/login?returnTo=" + encodeURIComponent(currentPath)
      : "/login";
    window.location.assign(loginUrl);
  }
}

/**
 * Check if a response indicates authentication failure
 */
export function isAuthError(status: number, json?: any): boolean {
  // 401 Unauthorized - token missing or invalid
  // 403 Forbidden - token valid but insufficient permissions
  if (status === 401 || status === 403) {
    return true;
  }

  // Also check for auth-related error messages
  if (json?.message) {
    const message = json.message.toLowerCase();
    const authKeywords = [
      "unauthorized",
      "forbidden",
      "invalid token",
      "token expired",
      "session expired",
      "authentication required",
    ];
    return authKeywords.some((keyword) => message.includes(keyword));
  }

  return false;
}

