"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export default function Button({
  children,
  variant = "outline",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors";

  const variants: Record<string, string> = {
    outline:
      "border-2 border-purple-600 text-purple-600 px-8 py-3 hover:bg-purple-600 hover:text-white",
    solid: "bg-purple-600 text-white px-8 py-3 hover:bg-purple-700",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
