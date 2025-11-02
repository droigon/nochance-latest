import { BlogPostsDTO } from "@/dtos/blog.dto";
import { apiFetch } from "@/lib/api";
import { ApiResponse } from "@/utils/types/api";
import { API_ROUTES } from "../index";

export const BlogService = {
  async getBlogPosts(): Promise<ApiResponse<BlogPostsDTO[]>> {
    const url = API_ROUTES.getBlogPosts();
    return apiFetch<ApiResponse<BlogPostsDTO[]>>(url, {
      method: "GET",
    });
  },

  async getBlogPost(postId: string): Promise<ApiResponse<BlogPostsDTO>> {
    const url = API_ROUTES.getBlogPost(postId);
    return apiFetch<ApiResponse<BlogPostsDTO>>(url, {
      method: "GET",
    });
  },
};
