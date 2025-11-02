"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-balac shadow",
        variant === "outline" &&
          "border border-gray-200 bg-white text-gray-800",
        variant === "ghost" && "bg-transparent text-gray-700",
        className
      )}
    >
      {children}
    </button>
  );
};
