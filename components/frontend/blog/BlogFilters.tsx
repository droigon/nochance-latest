'use client';

import { BlogFilterProps, BlogQueryParams } from '@/types/blog';
import { motion } from 'framer-motion';

export function BlogFilters({ 
  categories, 
  authors, 
  selectedCategory, 
  selectedAuthor, 
  selectedSort, 
  onFilterChange 
}: BlogFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 mb-8 border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onFilterChange({ category: e.target.value || undefined })}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name} ({category.postCount})
              </option>
            ))}
          </select>
        </div>

        {/* Author Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <select
            value={selectedAuthor || ''}
            onChange={(e) => onFilterChange({ author: e.target.value || undefined })}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name} ({author.postCount})
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={selectedSort || 'latest'}
            onChange={(e) => onFilterChange({ sort: e.target.value as BlogQueryParams['sort'] })}
              className="w-full bg-white border border-gray-200 text-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Active filters display */}
      {(selectedCategory || selectedAuthor || (selectedSort && selectedSort !== 'latest')) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-700">Active filters:</span>
            {selectedCategory && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                <button onClick={() => onFilterChange({ category: undefined })} className="hover:bg-purple-700 rounded-full w-4 h-4 flex items-center justify-center">×</button>
              </span>
            )}
            {selectedAuthor && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                Author: {selectedAuthor}
                <button onClick={() => onFilterChange({ author: undefined })} className="hover:bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">×</button>
              </span>
            )}
            {selectedSort && selectedSort !== 'latest' && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                Sort: {selectedSort}
                <button onClick={() => onFilterChange({ sort: 'latest' })} className="hover:bg-purple-700 rounded-full w-4 h-4 flex items-center justify-center">×</button>
              </span>
            )}
            <button
              onClick={() => onFilterChange({ category: undefined, author: undefined, sort: 'latest' })}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded-full transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}