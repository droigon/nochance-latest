// Strapi Blog API Integration
const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiArticle {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    author?: {
      data?: {
        attributes: {
          name: string;
          avatar?: {
            data?: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    category?: {
      data?: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags?: {
      data: Array<{
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Generic Strapi API fetch wrapper
 */
async function strapiApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_API_URL}/api${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Add authorization header if API token is available
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Strapi API request failed:", error);
    throw error;
  }
}

/**
 * Fetch all blog articles with optional filtering
 */
export async function getBlogArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
  tags?: string[];
  featured?: boolean;
}) {
  const searchParams = new URLSearchParams();

  if (params?.page)
    searchParams.append("pagination[page]", params.page.toString());
  if (params?.pageSize)
    searchParams.append("pagination[pageSize]", params.pageSize.toString());

  // Populate related fields
  searchParams.append("populate[0]", "coverImage");
  searchParams.append("populate[1]", "author.avatar");
  searchParams.append("populate[2]", "category");
  searchParams.append("populate[3]", "tags");

  // Add filters
  if (params?.category) {
    searchParams.append("filters[category][slug][$eq]", params.category);
  }

  if (params?.tags && params.tags.length > 0) {
    params.tags.forEach((tag, index) => {
      searchParams.append(`filters[tags][slug][$in][${index}]`, tag);
    });
  }

  if (params?.featured) {
    searchParams.append("filters[featured][$eq]", "true");
  }

  // Sort by publication date (newest first)
  searchParams.append("sort[0]", "publishedAt:desc");

  const queryString = searchParams.toString();
  const endpoint = `/articles${queryString ? `?${queryString}` : ""}`;

  return strapiApiRequest<StrapiResponse<StrapiArticle[]>>(endpoint);
}

/**
 * Fetch a single blog article by slug
 */
export async function getBlogArticleBySlug(slug: string) {
  const searchParams = new URLSearchParams();

  // Populate related fields
  searchParams.append("populate[0]", "coverImage");
  searchParams.append("populate[1]", "author.avatar");
  searchParams.append("populate[2]", "category");
  searchParams.append("populate[3]", "tags");

  // Filter by slug
  searchParams.append("filters[slug][$eq]", slug);

  const endpoint = `/articles?${searchParams.toString()}`;

  const response = await strapiApiRequest<StrapiResponse<StrapiArticle[]>>(
    endpoint
  );
  return response.data[0] || null;
}

/**
 * Fetch featured blog articles
 */
export async function getFeaturedArticles(limit: number = 3) {
  return getBlogArticles({
    pageSize: limit,
    featured: true,
  });
}

/**
 * Fetch blog categories
 */
export async function getBlogCategories() {
  const searchParams = new URLSearchParams();
  searchParams.append("sort[0]", "name:asc");

  const endpoint = `/categories?${searchParams.toString()}`;

  return strapiApiRequest<
    StrapiResponse<
      Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
          description?: string;
        };
      }>
    >
  >(endpoint);
}

/**
 * Fetch blog tags
 */
export async function getBlogTags() {
  const searchParams = new URLSearchParams();
  searchParams.append("sort[0]", "name:asc");

  const endpoint = `/tags?${searchParams.toString()}`;

  return strapiApiRequest<
    StrapiResponse<
      Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>
    >
  >(endpoint);
}

/**
 * Utility function to get full URL for Strapi media
 */
export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }
  return `${STRAPI_API_URL}${url}`;
}

/**
 * Convert Strapi article to a more usable format
 */
export function transformStrapiArticle(article: StrapiArticle) {
  return {
    id: article.id,
    title: article.attributes.title,
    slug: article.attributes.slug,
    content: article.attributes.content,
    excerpt: article.attributes.excerpt,
    featuredImage: article.attributes.coverImage?.data
      ? {
          url: getStrapiMediaUrl(
            article.attributes.coverImage.data.attributes.url
          ),
          alt:
            article.attributes.coverImage.data.attributes.alternativeText ||
            article.attributes.title,
        }
      : null,
    author: article.attributes.author?.data
      ? {
          name: article.attributes.author.data.attributes.name,
          avatar: article.attributes.author.data.attributes.avatar?.data
            ? {
                url: getStrapiMediaUrl(
                  article.attributes.author.data.attributes.avatar.data
                    .attributes.url
                ),
              }
            : null,
        }
      : null,
    category: article.attributes.category?.data
      ? {
          name: article.attributes.category.data.attributes.name,
          slug: article.attributes.category.data.attributes.slug,
        }
      : null,
    tags:
      article.attributes.tags?.data.map((tag) => ({
        name: tag.attributes.name,
        slug: tag.attributes.slug,
      })) || [],
    publishedAt: article.attributes.publishedAt,
    createdAt: article.attributes.createdAt,
    updatedAt: article.attributes.updatedAt,
  };
}
