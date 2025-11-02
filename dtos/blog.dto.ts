export interface BlogPostsDTO {
  id: string;
  documentId: string;
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author: AuthorDTO;
}
export interface AuthorDTO {
  name: string;
  profilePicture: string;
}
