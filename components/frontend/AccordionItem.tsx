"use client";

import { useState } from "react";

export default function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-gray-900 font-medium">{title}</span>
        <span
          className={`text-purple-600 ml-4 transform transition-transform ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      <div
        className={`px-6 pb-6 text-gray-700 transition-all ${
          open ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
