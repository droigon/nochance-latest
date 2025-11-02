import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogPostContent } from "@/components/frontend/blog/BlogPostContent";
import { fetchBlogPost } from "@/lib/blog-api";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import FAQPage from "../../faq/page";
import FooterCTA from "@/components/frontend/FooterCTA";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let response;

  const { slug } = (await params) as { slug: string };

  try {
    response = await fetchBlogPost(slug);
  } catch {
    console.error("Error fetching blog post");
    notFound();
  }

  if (!response.success || !response.data) {
    notFound();
  }

  const post = response.data;

  return (
    <main className="">
      <Header />
      <div className="min-h-screen bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <BlogPostContent post={post} />
        </div>
      </div>
      <FAQPage />
      <FooterCTA />
      <Footer />
    </main>
  );
}

// Generate static params for static generation (optional)
// In a real app, you'd fetch all blog post slugs from your API/CMS
export async function generateStaticParams() {
  // This could fetch all blog post slugs from your API
  // For now, we'll return an empty array to generate pages on-demand
  return [];
}
