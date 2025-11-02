"use client";

import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils"; // if you already have cn helper in your lib

// Fallback cn in case @/lib/utils is unavailable
// function cn(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// ✅ Input variants (CVA-powered)
const inputVariants = cva(
  "w-full rounded-lg text-sm focus:outline-none transition-all placeholder-gray-400",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400",
        outlined:
          "bg-transparent border border-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-purple-500",
        filled:
          "bg-gray-100 border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:border-purple-400",
      },
      size: {
        sm: "text-sm py-2 px-3",
        md: "text-base py-2.5 px-4",
        lg: "text-lg py-3 px-5",
      },
      error: {
        true: "border-red-500 focus:ring-red-200 focus:border-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
    },
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      errorMessage,
      variant,
      size,
      error,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={cn(
            inputVariants({ variant, size, error: !!errorMessage }),
            className
          )}
          {...props}
        />

        {(helperText || errorMessage) && (
          <p
            className={cn(
              "text-xs mt-1",
              errorMessage ? "text-red-500" : "text-gray-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
