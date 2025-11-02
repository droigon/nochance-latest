"use client";

import React, { useState } from "react";

interface HeroMessageProps {
  message: React.ReactNode;
  variant?: "default" | "info" | "success" | "danger";
  dismissible?: boolean;
}

export default function HeroMessage({
  message,
  variant = "info",
  dismissible = true,
}: HeroMessageProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const bg =
    variant === "info"
      ? "bg-indigo-50 border-indigo-100 text-indigo-700"
      : variant === "success"
      ? "bg-green-50 border-green-100 text-green-700"
      : variant === "danger"
      ? "bg-red-50 border-red-100 text-red-700"
      : "bg-gray-50 border-gray-100 text-gray-800";

  return (
    <div
      role="status"
      className={`${bg} border rounded-lg px-4 py-2 inline-flex items-center gap-3 max-w-2xl`}
    >
      <div className="text-sm leading-snug">{message}</div>

      {dismissible && (
        <button
          aria-label="Dismiss message"
          onClick={() => setVisible(false)}
          className="ml-2 p-1 rounded hover:bg-black/5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
