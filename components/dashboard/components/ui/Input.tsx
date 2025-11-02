"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-lg border text-black border-gray-200 px-3 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
