"use client";

import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting for demo purposes
    // In a real app, you'd use a proper markdown parser like react-markdown
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold text-gray-900 mb-4 mt-8"
          >
            {line.replace("# ", "")}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-900 mb-3 mt-6"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold text-gray-900 mb-2 mt-4">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="text-gray-600 mb-1">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-600 mb-1 ml-4">
            {line}
          </li>
        );
      }
      if (line.startsWith("| ")) {
        // Simple table row handling
        return (
          <tr key={index} className="border-b border-gray-200">
            {line
              .split("|")
              .slice(1, -1)
              .map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-2 text-gray-600">
                  {cell.trim()}
                </td>
              ))}
          </tr>
        );
      }
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 p-2">
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900  p-2 leading-tight">
          {post.title}
        </h2>
        <div className="flex items-center justify-between p-2 ">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-violet-103 w-10 h-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3.33203 18.75C3.33203 17.5389 3.63759 16.4167 4.2487 15.3833C4.83759 14.3833 5.63203 13.5889 6.63203 13C7.66536 12.3889 8.78759 12.0833 9.9987 12.0833C11.2098 12.0833 12.332 12.3889 13.3654 13C14.3654 13.5889 15.1598 14.3833 15.7487 15.3833C16.3598 16.4167 16.6654 17.5389 16.6654 18.75H14.9987C14.9987 17.85 14.7709 17.0111 14.3154 16.2333C13.8709 15.4778 13.2709 14.8778 12.5154 14.4333C11.7376 13.9778 10.8987 13.75 9.9987 13.75C9.0987 13.75 8.25981 13.9778 7.48203 14.4333C6.72648 14.8778 6.12648 15.4778 5.68203 16.2333C5.22648 17.0111 4.9987 17.85 4.9987 18.75H3.33203ZM9.9987 11.25C9.08759 11.25 8.2487 11.0222 7.48203 10.5667C6.72648 10.1222 6.12648 9.52222 5.68203 8.76667C5.22648 8 4.9987 7.16111 4.9987 6.25C4.9987 5.33889 5.22648 4.5 5.68203 3.73333C6.12648 2.97778 6.72648 2.37778 7.48203 1.93333C8.2487 1.47778 9.08759 1.25 9.9987 1.25C10.9098 1.25 11.7487 1.47778 12.5154 1.93333C13.2709 2.37778 13.8709 2.97778 14.3154 3.73333C14.7709 4.5 14.9987 5.33889 14.9987 6.25C14.9987 7.16111 14.7709 8 14.3154 8.76667C13.8709 9.52222 13.2709 10.1222 12.5154 10.5667C11.7487 11.0222 10.9098 11.25 9.9987 11.25ZM9.9987 9.58333C10.5987 9.58333 11.1543 9.43333 11.6654 9.13333C12.1765 8.83333 12.582 8.42778 12.882 7.91667C13.182 7.40555 13.332 6.85 13.332 6.25C13.332 5.65 13.182 5.09444 12.882 4.58333C12.582 4.07222 12.1765 3.66667 11.6654 3.36667C11.1543 3.06667 10.5987 2.91667 9.9987 2.91667C9.3987 2.91667 8.84314 3.06667 8.33203 3.36667C7.82092 3.66667 7.41536 4.07222 7.11536 4.58333C6.81536 5.09444 6.66536 5.65 6.66536 6.25C6.66536 6.85 6.81536 7.40555 7.11536 7.91667C7.41536 8.42778 7.82092 8.83333 8.33203 9.13333C8.84314 9.43333 9.3987 9.58333 9.9987 9.58333Z"
                  fill="#9333EA"
                />
              </svg>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-800">Admin</div>
              <div className="text-xs text-gray-500">Security Analyst</div>
            </div>
          </div>
        </div>

        <div className="p-2 mb-4">
          <Image
            src={post.coverImage || "/images/default-blog-cover.jpg"}
            alt={post.title}
            width={800}
            height={400}
            unoptimized
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="bg-white  p-8 ">{formatContent(post.content)}</div>
      </div>

      {/* Author Bio */}

      {/* Navigation */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Link
            href="/blog"
            className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors text-center border border-gray-200"
          >
            ← All Blog Posts
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
