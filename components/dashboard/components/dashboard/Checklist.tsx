"use client";
import Link from "next/link";
import { Step } from "@/utils/constants/vendorSteps";

export default function Checklist({
  steps,
  completed = {} as Record<
    string,
    boolean | "pending" | "declined" | "approved"
  >,
}: {
  steps: Step[];
  completed?: Record<string, boolean | "pending" | "declined" | "approved">;
}) {
  const completedCount = Object.values(completed).filter(Boolean).length;
  const percent = Math.round((completedCount / steps.length) * 100);

  const renderStatusBadge = (status?: boolean | string) => {
    if (status === true || status === "approved") {
      return (
        <div className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">
          Approved
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className="text-xs text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
          Pending
        </div>
      );
    }
    if (status === "declined") {
      return (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
          Declined
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg md:rounded-lg shadow p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xs md:text-sm font-medium text-gray-700">
          Complete your setup ({steps.length})
        </h2>
      </div>

      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full bg-purple-600"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
        {steps.map((s) => {
          const status = completed[s.id];
          const done = Boolean(status === true || status === "approved");
          return (
            <Link
              key={s.id}
              href={s.route}
              className="w-full text-left bg-white rounded-lg shadow-sm p-3 md:p-4 flex items-start gap-3 md:gap-4 hover:shadow-md transition"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-gray-50 flex-shrink-0">
                {s.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <div className="text-sm md:text-base font-medium text-gray-900 truncate">
                      {s.title}
                    </div>

                    {s.required && (
                      <div className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded w-fit">
                        Required
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {renderStatusBadge(status)}
                  </div>
                </div>

                <div className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">{s.desc}</div>
              </div>

              <div className="hidden sm:flex items-center text-gray-400 flex-shrink-0">
                {done ? (
                  <span className="text-xs md:text-sm text-green-600 font-medium whitespace-nowrap">
                    Completed
                  </span>
                ) : (
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
