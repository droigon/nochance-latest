"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className=" flex max-w-2xl px-2 py-2 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center px-3 text-gray-400">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search company or category"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow px-4 py-3 outline-none text-gray-700"
      />

      <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-r-lg shadow-md hover:shadow-lg transition flex items-center gap-2">
        Search →
      </button>
    </div>
  );
}
