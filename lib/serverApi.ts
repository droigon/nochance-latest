const rawBase =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:2000";
const withScheme = /^https?:\/\//i.test(rawBase) ? rawBase : `http://${rawBase}`;
const normalizedBase = withScheme.replace(/\/$/, "");

export const getServerApiBaseUrl = () => normalizedBase;

export async function serverApiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const base = getServerApiBaseUrl();
  const url =
    path.startsWith("http://") || path.startsWith("https://")
      ? path
      : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    cache: "no-store",
    ...init,
  });

  if (!res.ok) {
    const message = `API request failed (${res.status} ${res.statusText})`;
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

