"use client";

import HomeCard from "./HomeCard";
import { BlogPost } from "@/types/blog";

export default function LatestArticles({ posts }: { posts: BlogPost[] }) {
  const slice = posts.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
          Latest Articles
        </h3>
        <p className="text-gray-600 mt-2">
          Stay updated with the latest scam alerts, verification tips, and
          community insights from our experts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slice.map((post) => (
          <HomeCard key={post.id} post={post} />
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-500">
          Load More Articles
        </button>
      </div>
    </section>
  );
}
