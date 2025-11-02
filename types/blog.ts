// Blog post types and interfaces
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };

  coverImage: string;
  publishedAt: string;

  readingTime: number; // in minutes
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  postCount: number;
}

// API Response types
export interface BlogApiResponse {
  success: boolean;
  data: BlogPost[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
  message?: string;
}

export interface SingleBlogApiResponse {
  success: boolean;
  data: BlogPost;
  message?: string;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  tag?: string;
  search?: string;
  sort?: "latest" | "oldest" | "popular";
}

// Component props types
export interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export interface BlogListProps {
  posts: BlogPost[];
  pagination: BlogApiResponse["pagination"];
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export interface BlogFilterProps {
  categories: BlogCategory[];
  authors: BlogAuthor[];
  selectedCategory?: string;
  selectedAuthor?: string;
  selectedSort?: string;
  onFilterChange: (filters: Partial<BlogQueryParams>) => void;
}

export interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}
