"use client";
import React from "react";

interface StepDividerProps {
  active?: boolean;
}

export default function StepDivider({ active = false }: StepDividerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="2"
      viewBox="0 0 64 2"
      fill="none"
      className="mx-2 mb-8"
    >
      <line
        x1="1"
        y1="1"
        x2="63"
        y2="1"
        stroke={active ? "#6B01FF" : "#E5E7EB"} // purple or gray
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 8"
      />
    </svg>
  );
}
