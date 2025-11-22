"use client";
import LivenessForm from "@/components/dashboard/components/forms/verification/LivenessForm";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";
import { useState } from "react";

export default function LivenessFormPage() {
  const { vendorType, loading: vendorLoading } = useVendorType();
  const steps = useVerificationSteps(vendorType ?? "");
  const currentId = "LIVENESS";
  const [loading, setLoading] = useState(true);
  const ids = steps.map((s) => s.id.toUpperCase());
  const idx = ids.indexOf(currentId);
  const stepNumber = idx + 1;
  const totalSteps = steps.length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="p-8 overflow-y-auto">
          <div className="min-h-[70vh] flex items-start justify-center px-4">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-6">
                <div className="text-xs text-gray-400">
                  {loading ? "Loading…" : `Step ${stepNumber} of ${totalSteps}`}
                </div>
              </div>
              <LivenessForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
