import {
  BlogApiResponse,
  SingleBlogApiResponse,
  BlogQueryParams,
} from "@/types/blog";
import React from "react";
import { calculateReadingTime } from "@/utils/blogs/readingTime";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "http://localhost:3004"
    : "http://localhost:3000");

/**
 * Generic fetch wrapper with error handling
 */
async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * Fetch blog posts with filtering and pagination
 */

/**
 * Fetch a single blog post by slug
 */
//export async function fetchBlogPost(
//  slug: string
//): Promise<SingleBlogApiResponse> {
//  // If server-side, try to import the mock data and return the post directly
//  if (typeof window === "undefined") {
//    try {
//      const mod = await import("@/data/mock-blog");
//      const serverMockBlogPosts = mod.default as typeof mod.default;
//      const post = serverMockBlogPosts.find((p) => p.slug === slug);
//      if (!post) {
//        throw new Error("HTTP error! status: 404");
//      }
//      return Promise.resolve({ success: true, data: post });
//    } catch {
//      // fallback to HTTP fetch below
//    }
//  }
//
//  const url = buildUrl(`/api/blog/${encodeURIComponent(slug)}`);
//
//  return fetchWithErrorHandling<SingleBlogApiResponse>(url);
//}

/**
 * Search blog posts
 */

/**
 * Get blog posts by category
 */

/**
 * Custom hook for client-side fetching with loading and error states
 */

/**
 * Custom hook for fetching a single blog post
 */
export async function fetchBlogPost(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    // Build query string for Strapi filtering by slug
    const queryParams = new URLSearchParams({
      "filters[slug][$eq]": slug,
      populate: "*",
    });

    const res = await fetch(
      `${baseUrl}/api/blog-posts?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
        next: { revalidate: 60 }, // optional for ISR
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch blog post: ${res.status} ${res.statusText}`
      );
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      throw new Error("Blog post not found");
    }

    const item = json.data[0]; // since it's filtered by slug, expect one result

    return {
      success: true,
      data: {
        id: item.id,
        title: item.title,
        content: item.content,
        slug: item.slug,
        excerpt:
          item.content && item.content.length > 150
            ? item.content.slice(0, 150) + "..."
            : item.content,
        coverImage: item.coverImage ? `${baseUrl}${item.coverImage.url}` : "",
        category: item.category?.data?.attributes?.name || "",
        author: item.author?.data?.attributes?.name || "Admin",
        createdAt: item.createdAt,
        publishedAt: item.publishedAt,
        readingTime: calculateReadingTime(item.content || ""),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong fetching blog post",
    };
  }
}

//export function useBlogPost(slug: string) {
//  const [data, setData] = React.useState<SingleBlogApiResponse | null>(null);
//  const [loading, setLoading] = React.useState(true);
//  const [error, setError] = React.useState<string | null>(null);
//
//  React.useEffect(() => {
//    if (!slug) return;
//
//    const fetchData = async () => {
//      try {
//        setLoading(true);
//        setError(null);
//        const result = await fetchBlogPost(slug);
//        setData(result);
//      } catch (err) {
//        setError(err instanceof Error ? err.message : "An error occurred");
//      } finally {
//        setLoading(false);
//      }
//    };
//
//    fetchData();
//  }, [slug]);
//
//  return { data, loading, error };
//}

// For server components, we can use these functions directly without hooks
export const blogApi = {
  fetchBlogPost,
};

// Import React for hooks (this should be at the top in a real file)

export async function fetchBlogPostss(filters: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    // You can add pagination, filtering, etc. from your filters state
    const queryParams = new URLSearchParams({
      "pagination[page]": String(filters.page || 1),
      "pagination[pageSize]": String(filters.limit || 9),
      "sort[0]": filters.sort === "latest" ? "createdAt:desc" : "createdAt:asc",
      populate: "*", // include relations & media
    });

    if (filters.search) {
      queryParams.append("filters[title][$containsi]", filters.search);
    }
    if (filters.category) {
      queryParams.append("filters[category][slug][$eq]", filters.category);
    }
    if (filters.author) {
      queryParams.append("filters[author][id][$eq]", filters.author);
    }

    const res = await fetch(`${baseUrl}/api/blog-posts?populate=coverImage`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      next: { revalidate: 60 }, // ISR caching (optional)
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    return {
      success: true,
      data: json.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        slug: item.slug,
        coverImage: item.coverImage ? `${baseUrl}${item.coverImage.url}` : null,
        category: item.category?.data?.name || "",
        author: item.author?.data?.name || "",
        createdAt: item.createdAt,
        readingTime: calculateReadingTime(item.content || ""),
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
      })),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Something went wrong fetching posts",
    };
  }
}
