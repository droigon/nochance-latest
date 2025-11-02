// src/lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - className helper that combines clsx + tailwind-merge
 * Use it like: cn('p-2', isActive && 'bg-blue-500', extraClass)
 */
export function cn(...inputs: any[]): string {
  return twMerge(clsx(...inputs));
}
