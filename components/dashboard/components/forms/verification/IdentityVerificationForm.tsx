"use client";

import React from "react";
import { useVerification } from "@/context/VerificationContext";

export default function IdentityForm() {
  const { nextStep, prevStep } = useVerification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Step 2 of 3: Identity Verification</h2>
      <input
        type="text"
        placeholder="ID Number"
        className="border p-2 rounded w-full"
      />
      <input type="file" className="border p-2 rounded w-full" />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
