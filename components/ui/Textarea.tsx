"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-lg border border-gray-200 px-3 py-3 text-sm text-black placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-200",
          className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";
