"use client";

import { useState, useEffect, useCallback } from "react";
import { BlogPost, BlogQueryParams } from "@/types/blog";

import FeaturedArticles from "@/components/frontend/blog/FeaturedArticles";

import { fetchBlogPostss } from "@/lib/blog-api";

import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FAQPage from "../faq/page";

// Mock categories and authors for the filters

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // pagination state lives in the fetch responses; unused here for now

  const [filters, setFilters] = useState<BlogQueryParams>({
    page: 1,
    limit: 9,
    sort: "latest",
  });

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchBlogPostss(filters);

      if (response.success) {
        setPosts(response.data);
      } else {
        setError(response.message || "Failed to fetch blog posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  //const handleFilterChange = (newFilters: Partial<BlogQueryParams>) => {
  //  setFilters((prev) => ({
  //    ...prev,
  //    ...newFilters,
  //    page: 1, // Reset to first page when filters change
  //  }));
  //};
  //
  //// pagination handler (unused in this view) - left intentionally blank
  //
  //const handleSearch = (query: string) => {
  //  setFilters((prev) => ({
  //    ...prev,
  //    search: query || undefined,
  //    page: 1,
  //  }));
  //};

  return (
    <main className="">
      <Header />

      {/* Main Content */}

      <FeaturedArticles posts={posts} />

      {/* Latest articles 
          <LatestArticles posts={posts} />
          grid */}

      <FAQPage />
      <Footer />
    </main>
  );
}
