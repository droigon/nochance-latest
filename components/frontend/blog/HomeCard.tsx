"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

export default function HomeCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {post.coverImage && (
        <Link
          href={`/blog/${post.slug}`}
          className="block relative h-40 md:h-44 lg:h-48"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </Link>
      )}

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 hover:text-purple-600"
          >
            {post.title}
          </Link>
        </h4>
        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-800">
            {post.author.name}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="text-purple-600 font-medium hover:text-purple-500"
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}
