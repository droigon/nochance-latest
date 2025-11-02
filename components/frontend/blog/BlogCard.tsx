"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "@/types/blog";
import { motion } from "framer-motion";

export function BlogCard({ post, className = "" }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative">
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
              {post.category.name}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {post.readingTime} min read
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {post.title}
          </h2>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-purple-600 text-sm font-medium hover:text-purple-500 transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
