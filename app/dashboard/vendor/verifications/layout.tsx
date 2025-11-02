"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function VerificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const previous = () => {
    window.dispatchEvent(new CustomEvent("verification:previous"));
    router.back();
  };

  const close = () => {
    window.dispatchEvent(new CustomEvent("verification:close"));
    router.push("/dashboard");
  };

  const save = () => {
    window.dispatchEvent(new CustomEvent("verification:save"));
  };

  const cont = () => {
    window.dispatchEvent(new CustomEvent("verification:continue"));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between py-6 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={previous}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={close}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              aria-label="Close"
            >
              ×
            </button>

            <button
              onClick={save}
              className="text-sm text-purple-600 hover:underline"
            >
              Save & finish later
            </button>
          </div>
        </div>

        <div className="border-t border-dashed border-purple-200/40" />

        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-full max-w-2xl">{children}</div>
        </div>
      </div>
    </main>
  );
}
