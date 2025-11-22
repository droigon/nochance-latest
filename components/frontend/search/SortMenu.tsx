"use client";

import { ListFilter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { label: "Rating", value: "rating" },
  { label: "Trust score", value: "trust" },
  { label: "Newest", value: "newest" },
];

type SortMenuProps = {
  currentSort: string;
};

export function SortMenu({ currentSort }: SortMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    const query = params.toString();
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <ListFilter className="h-4 w-4 text-gray-400" />
      <span className="hidden sm:inline">Sort by:</span>
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:border-indigo-500 focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

