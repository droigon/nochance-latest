// ...existing code...
import { toast } from "react-toastify";
import { handleGlobalLogout, isAuthError } from "./auth-handler";

const rawBase = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2000"
).trim();
// ensure scheme is present
const normalizedBase =
  rawBase && !/^https?:\/\//i.test(rawBase) ? `http://${rawBase}` : rawBase;
export const API_BASE_URL = normalizedBase.replace(/\/$/, "");

// Track if logout is in progress to prevent multiple simultaneous logouts
let isLoggingOut = false;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url =
    endpoint.startsWith("http://") || endpoint.startsWith("https://")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  // attach token from localStorage (client only)
  const authHeader: Record<string, string> = {};
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) authHeader["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
      ...authHeader,
    },
    cache: "no-store",
  });

  // try to parse JSON safely
  let json: any = null;
  try {
    json = await res.json();
  } catch (e) {
    if (!res.ok) {
      // Check if it's an auth error even without JSON
      if (isAuthError(res.status)) {
        if (!isLoggingOut && typeof window !== "undefined") {
          isLoggingOut = true;
          toast.error("Session expired. Please log in again.");
          await handleGlobalLogout();
        }
        throw new Error("Unauthorized");
      }
      toast.error(res.statusText || "Request failed");
      throw new Error(res.statusText || "Request failed");
    }
    return null as unknown as T;
  }

  // Check for authentication errors (401/403)
  if (isAuthError(res.status, json)) {
    if (!isLoggingOut && typeof window !== "undefined") {
      isLoggingOut = true;
      const errorMessage =
        json?.message || "Your session has expired. Please log in again.";
      toast.error(errorMessage);
      await handleGlobalLogout();
    }
    // Throw error to prevent further processing
    throw new Error(json?.message || "Unauthorized");
  }

  // Handle other errors
  if (!res.ok || json?.success === false) {
    // Don't show toast for auth errors (already handled above)
    if (!isAuthError(res.status, json)) {
      toast.error(json?.message || "Something went wrong");
    }
  }

  //if (json?.success && json?.message) {
  //  toast.success(json.message);
  //}

  return json as T;
}
// ...existing code...
