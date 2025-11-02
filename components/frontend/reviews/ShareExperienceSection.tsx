"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function ShareExperienceSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <section className="relative py-20 px-4 bg-grey-98">
      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <h2 className="heading-3 text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Share your Experience
        </h2>

        {/* Subtitle */}
        <p className="lead  mb-10">
          Share your business experiences and help fellow Nigerians make
          informed decisions. Together, we can build a trusted community.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center justify-center gap-3"
        >
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name, phone number, account number, website or BN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-500"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg- hover:from-purple-700 hover:to-purple-800 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}
