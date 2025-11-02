// ...existing code...
import { toast } from "react-toastify";

const rawBase = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2000"
).trim();
// ensure scheme is present
const normalizedBase =
  rawBase && !/^https?:\/\//i.test(rawBase) ? `http://${rawBase}` : rawBase;
export const API_BASE_URL = normalizedBase.replace(/\/$/, "");

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
      toast.error(res.statusText || "Request failed");
      throw new Error(res.statusText || "Request failed");
    }
    return null as unknown as T;
  }

  if (!res.ok || json?.success === false) {
    toast.error(json?.message || "Something went wrong");
  }

  if (json?.success && json?.message) {
    toast.success(json.message);
  }

  return json as T;
}
// ...existing code...
