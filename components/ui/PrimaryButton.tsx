"use client";
import React from "react";
import Link from "next/link";

type ButtonVariant =
  | "outline"
  | "outlineRounded"
  | "solid"
  | "solidRounded"
  | "gradient"
  | "gradientRounded"
  | "whiteRounded"
  | "light"
  | "lightRounded";

type ButtonSize = "sm" | "md" | "lg" | "full";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
}

export default function PrimaryButton({
  children,
  variant = "outline",
  size = "md",
  className = "",
  href,
  target,
  rel,
  ...props
}: PrimaryButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200";

  const variants: Record<ButtonVariant, string> = {
    outline:
      "border-2 border-violet-50 text-violet-50 px-8 py-2 hover:bg-violet-50 hover:text-white",
    outlineRounded:
      "border-2 border-violet-50 text-violet-50 px-8 py-3 hover:bg-violet-50 hover:text-white rounded-lg",
    solid: "bg-violet-50 text-white px-8 py-3 hover:bg-purple-700",
    solidRounded:
      "bg-violet-50 text-white px-8 py-3 hover:bg-purple-700 rounded-lg",
    gradient:
      "btn-gradient px-6 py-3 font-semibold flex items-center gap-2 text-white",
    gradientRounded:
      "btn-gradient px-6 py-3 rounded-lg font-semibold flex items-center gap-2 text-white",
    whiteRounded:
      "px-6 py-3 rounded-lg bg-white text-violet-50 font-semibold shadow hover:bg-gray-100 flex items-center gap-2",
    light:
      "rounded-lg border border-violet-103 bg-violet-103 text-violet-102 text-sm font-semibold shadow-sm px-6 py-3 hover:bg-violet-104 transition",
    lightRounded:
      "px-6 py-3 rounded-lg bg-white text-violet-50 font-semibold shadow hover:bg-gray-100 flex items-center gap-2",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
    full: "w-full py-3 text-center justify-center",
  };

  const classNames = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const isExternal = href && /^(https?:)?\/\//.test(href);
  const safeRel = isExternal ? rel ?? "noopener noreferrer" : rel;

  // ✅ Use modern Link (no legacyBehavior)
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={safeRel}
        className={classNames}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}
