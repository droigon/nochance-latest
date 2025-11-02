export const BLOG_ROUTES = {
  // functions that build the final URL (replace :blogId)
  getBlogPosts: () => `/api/v1/blog/posts`,
  getBlogPost: (postId: string) =>
    `/api/v1/blog/posts/${encodeURIComponent(postId)}`,
};
