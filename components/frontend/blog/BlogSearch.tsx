'use client';

import { useState } from 'react';
import { BlogSearchProps } from '@/types/blog';
import { motion } from 'framer-motion';

export function BlogSearch({ onSearch, placeholder = "Search blog posts...", className = "" }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 ${className}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-white border border-gray-200 text-gray-700 rounded-lg px-4 py-3 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          {/* Search Button */}
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">Search</button>
        </div>
      </form>

      {/* Search suggestions or recent searches could go here */}
      {searchQuery.length > 0 && searchQuery.length < 3 && (
        <p className="text-xs text-gray-400 mt-2 ml-1">
          Type at least 3 characters to search
        </p>
      )}
    </motion.div>
  );
}