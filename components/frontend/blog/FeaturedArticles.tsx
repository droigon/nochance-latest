"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
interface FeaturedArticlesProps {
  posts: BlogPost[];
}

export default function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  const slice = posts.slice(0, 2);

  return (
    <section className="max-w-7xl bg-white mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h3 className="text-black text-2xl md:text-3xl font-bold">
          Nochance Journal: Scam Alerts, Data & Product Notes
        </h3>
        <p className="text-gray-500 mt-2">
          Stay informed with the latest scam trends, verification guides, and
          community insights to protect yourself and others from fraud.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {slice.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm flex flex-col h-full"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="w-full h-56 md:h-72 relative">
                <Image
                  src={post.coverImage || "/images/default-blog-cover.jpg"}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="text-xs text-gray-500 mb-3">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {post.readingTime} min read
                </div>

                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gray-900 hover:text-violet-100"
                  >
                    {post.title}
                  </Link>
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  {post.content.split(" ").length > 30
                    ? post.content.split(" ").slice(0, 30).join(" ") + "..."
                    : post.content}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      Admin
                    </div>
                    <div className="text-xs text-gray-500">
                      Security Analyst
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-violet-90 font-medium hover:text-purple-500"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
