"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CACDetailsForm from "@/components/dashboard/components/forms/verification/BusinessInformationForm";
import { useAuth } from "@/context/AuthContexts";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";
import { VerificationService } from "@/services/verifications/verifications";

export default function CACDetailsPage() {
  const router = useRouter();
  const { business } = useAuth();
  const { vendorType, loading: vendorLoading } = useVendorType();
  const steps = useVerificationSteps(vendorType ?? "");

  const [initial, setInitial] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(true);

  const currentId = "BUSINESS";
  const ids = steps.map((s) => s.id.toUpperCase());
  const idx = ids.indexOf(currentId);
  const stepNumber = idx + 1;
  const totalSteps = steps.length;

  useEffect(() => {
    if (vendorLoading || !business?.id) return;

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/business/${business.id}`, {
          headers: { Accept: "application/json" },
          credentials: "include",
        });
        const json = await res.json();
        const data = json?.data ?? {};
        const base = {
          type: data.type ?? "RC",
          name: data.name ?? "",
          number: data.number ?? "",
        };
        setInitial(base);
      } catch (e) {
        console.error("❌ Failed to fetch CAC details:", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [business?.id, vendorLoading]);

  const handleContinue = async (values: Record<string, any>) => {
    if (!business?.id) {
      alert("No business ID found. Please log in again.");
      return;
    }

    try {
      const res = await VerificationService.save(business.id, {
        category: currentId,
        documents: values,
      });

      // ✅ Unified success check
      if (!res || res.success !== true) {
        console.error("❌ Submission failed:", res);
        ///alert(res?.error || "Failed to save CAC details. Please try again.");
        return; // ❌ Don’t navigate
      }

      // ✅ Only navigate if successful
      const nextId = idx < ids.length - 1 ? ids[idx + 1] : null;
      router.push(
        nextId
          ? `/dashboard/vendor/verifications/${nextId.toLowerCase()}`
          : `/dashboard/vendor`
      );
    } catch (e) {
      console.error("❌ Submission failed:", e);
      alert("An unexpected error occurred while saving your CAC details.");
    }
  };

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
              {!loading && (
                <CACDetailsForm initial={initial} onContinue={handleContinue} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
