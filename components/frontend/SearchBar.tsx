"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type KeyboardEvent,
} from "react";
import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { BusinessService } from "@/services/business/business";
import type { BusinessSuggestion } from "@/utils/types/business";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_DELAY = 200;
const MAX_CACHE_ENTRIES = 6;

type SearchBarProps = {
  initialQuery?: string;
};

export default function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<BusinessSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const cacheRef = useRef<Map<string, BusinessSuggestion[]>>(new Map());
  const cacheOrderRef = useRef<string[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const trimmedQuery = query.trim();
  const belowThreshold =
    trimmedQuery.length > 0 && trimmedQuery.length < MIN_QUERY_LENGTH;

  const touchCacheKey = useCallback((key: string) => {
    const order = cacheOrderRef.current;
    const existingIndex = order.indexOf(key);
    if (existingIndex !== -1) {
      order.splice(existingIndex, 1);
    }
    order.push(key);
    if (order.length > MAX_CACHE_ENTRIES) {
      const oldest = order.shift();
      if (oldest) {
        cacheRef.current.delete(oldest);
      }
    }
  }, []);

  const fetchSuggestions = useCallback(
    async (term: string) => {
      const normalized = term.trim();
      if (normalized.length < MIN_QUERY_LENGTH) {
        return;
      }

      const cacheKey = normalized.toLowerCase();
      const cached = cacheRef.current.get(cacheKey);
      if (cached) {
        startTransition(() => {
          setSuggestions(cached);
          setShowDropdown(true);
        });
      }

      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;

      setLoadingSuggestions(true);
      setShowDropdown(true);

      try {
        const response = await BusinessService.searchSuggestions(
          normalized,
          5,
          { signal: controller.signal }
        );
        if (!response.success) return;
        const data = response.data ?? [];
        cacheRef.current.set(cacheKey, data);
        touchCacheKey(cacheKey);

        startTransition(() => {
          setSuggestions(data);
          setShowDropdown(true);
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        console.error("Failed to load suggestions", err);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoadingSuggestions(false);
      }
    },
    [startTransition, touchCacheKey]
  );

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!trimmedQuery) {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
      setSuggestions([]);
      setShowDropdown(false);
      setLoadingSuggestions(false);
      return;
    }

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
      setLoadingSuggestions(false);
      setShowDropdown(true);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(trimmedQuery);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [fetchSuggestions, trimmedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (error && trimmedQuery.length >= MIN_QUERY_LENGTH) {
      setError(null);
    }
  }, [error, trimmedQuery]);

  const resolveBusinessId = useCallback(
    async (suggestion?: BusinessSuggestion) => {
      const candidate = suggestion?.id;
      if (candidate && candidate !== "undefined") {
        return candidate;
      }

      const fallbackQuery =
        suggestion?.name?.trim() &&
        suggestion.name.trim().length >= MIN_QUERY_LENGTH
          ? suggestion.name.trim()
          : trimmedQuery.length >= MIN_QUERY_LENGTH
          ? trimmedQuery
          : "";

      if (!fallbackQuery) {
        return null;
      }

      try {
        const response = await BusinessService.searchBusinesses({
          query: fallbackQuery,
          limit: 1,
          page: 1,
        });
        return response.data?.items?.[0]?.id ?? null;
      } catch (error) {
        console.error("Failed to resolve business id", error);
        return null;
      }
    },
    [trimmedQuery]
  );

  const handleSuggestionSelect = useCallback(
    async (suggestion: BusinessSuggestion) => {
      setError(null);
      const businessId = await resolveBusinessId(suggestion);
      console.log("businessId", businessId);
      if (!businessId) {
        setError("Unable to open this business right now. Please try another.");
        return;
      }

      startTransition(() => {
        router.push(`/business/${encodeURIComponent(businessId)}`);
        router.refresh();
      });
      setShowDropdown(false);
    },
    [resolveBusinessId, router, startTransition]
  );

  const handleSearch = useCallback(() => {
    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setError(
        `Enter at least ${MIN_QUERY_LENGTH} characters to search for a business.`
      );
      return;
    }
    setSearching(true);
    setError(null);
    try {
      setShowDropdown(false);
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        router.refresh();
      });
    } catch (err) {
      console.error("Business search failed", err);
      setError("Unable to navigate to search results. Please try again.");
    } finally {
      setSearching(false);
    }
  }, [router, trimmedQuery, startTransition]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const secondaryLine = (suggestion: BusinessSuggestion) => {
    return suggestion.website || "";
  };

  const isLoadingState = loadingSuggestions || isPending;

  return (
    <div
      className="relative max-w-xs sm:max-w-sm md:max-w-2xl mx-auto"
      ref={containerRef}
    >
      <div className="flex px-2 py-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center px-2 sm:px-3 text-gray-400 flex-shrink-0">
          <Search size={16} className="sm:w-5 sm:h-5" />
        </div>
        <input
          type="text"
          placeholder="Search company or category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (trimmedQuery) setShowDropdown(true);
          }}
          onKeyDown={handleKeyDown}
          className="flex-grow px-2 sm:px-4 py-2 sm:py-3 outline-none text-xs sm:text-sm md:text-base text-gray-700"
        />

        <button
          onClick={handleSearch}
          disabled={searching}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-r-lg shadow-md hover:shadow-lg transition flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {searching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching
            </>
          ) : (
            <>
              Search <span className="hidden sm:inline">→</span>
            </>
          )}
        </button>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-30 max-h-72 overflow-y-auto">
          {isLoadingState && (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching vendors…
            </div>
          )}

          {belowThreshold ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              Type at least {MIN_QUERY_LENGTH} characters to see suggestions.
            </p>
          ) : suggestions.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.id ?? "suggestion"}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 transition"
                  >
                    <p className="text-sm font-semibold text-gray-800">
                      {suggestion.name || "Unnamed Business"}
                    </p>
                    {secondaryLine(suggestion) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {secondaryLine(suggestion)}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : !isLoadingState ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              No matching businesses yet.
            </p>
          ) : null}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
