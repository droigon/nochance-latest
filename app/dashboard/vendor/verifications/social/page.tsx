"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import SocialMediaForm from "@/components/dashboard/components/forms/verification/SocialMediaForm";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";
import { VerificationService } from "@/services/verifications/verifications";
import { useAuth } from "@/context/AuthContexts";

export default function SocialMediaPage() {
  const router = useRouter();
  const { vendorType, loading: vendorLoading, error } = useVendorType();
  const steps = useVerificationSteps(vendorType ?? "");
  const { business } = useAuth();

  const currentId = "SOCIAL";
  const [initial, setInitial] = useState<Record<string, string> | undefined>();
  const [loading, setLoading] = useState(true);

  // Precompute step info for navigation
  const { stepNumber, totalSteps, nextId } = useMemo(() => {
    const ids = steps.map((s) => s.id.toUpperCase());
    const idx = ids.indexOf(currentId);
    return {
      stepNumber: idx >= 0 ? idx + 1 : 1,
      totalSteps: ids.length > 0 ? ids.length : 1,
      nextId: idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null,
    };
  }, [steps]);

  // Fetch draft once vendorType is available
  useEffect(() => {
    if (vendorLoading || !vendorType) return;
    let cancelled = false;

    (async () => {
      try {
        const resp = await fetch(
          `/api/v1/verification/draft?vendorType=${encodeURIComponent(
            vendorType
          )}`,
          {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
            cache: "force-cache",
          }
        );
        if (!resp.ok) throw new Error("Failed to fetch draft");
        const draft = await resp.json();
        if (cancelled) return;

        const stepData = draft?.[currentId] ?? {};
        setInitial(stepData);
      } catch (e) {
        console.error("❌ Load social draft error:", e);
        if (!cancelled) setInitial(undefined);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [vendorType, vendorLoading]);

  const handleSaveDraft = async (values: Record<string, any>) => {
    if (!vendorType) return;
    try {
      await fetch(`/api/v1/verification/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ vendorType, step: currentId, values }),
      });
    } catch (e) {
      console.error("❌ Save social draft failed:", e);
    }
  };

  // Finalize this step: save draft, then persist final submission (via service) and navigate
  const handleNext = async (values?: Record<string, any>) => {
    const payload = values ?? {};

    // Always save draft first
    await handleSaveDraft(payload);

    // Resolve business ID
    const businessId =
      business?.id ??
      (() => {
        try {
          const raw = localStorage.getItem("business");
          return raw ? JSON.parse(raw)?.id : null;
        } catch {
          return null;
        }
      })();

    if (!businessId) {
      console.warn("No businessId found; only draft was saved.");
      alert("Business ID not found. Please re-login and try again.");
      return;
    }

    try {
      // Submit verification
      const res = await VerificationService.save(businessId, {
        category: "SOCIAL_MEDIA",
        documents: payload,
      });

      // ✅ Check for error or failed status
      if (!res || res.success !== true) {
        console.error("❌ Social media submission failed:", res);
        alert("Failed to save your social media details. Please try again.");
        return; // ❌ Stop navigation
      }

      // ✅ Only navigate when API succeeded
      if (nextId) {
        router.push(`/dashboard/vendor/verifications/${nextId.toLowerCase()}`);
      } else {
        router.push(`/dashboard/vendor`);
      }
    } catch (e) {
      console.error("❌ Submission failed:", e);
      alert("An unexpected error occurred while saving your details.");
      // ❌ Do not navigate if error occurs
    }
  };

  if (vendorLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading social media verification…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-dashed border-purple-200/40" />
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-6">
              <div className="text-xs text-gray-400 mb-2">
                Step {stepNumber} of {totalSteps}
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Social Media Handles
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Add your key social accounts (Instagram, X/Twitter, TikTok,
                YouTube, etc.)
              </p>
            </div>

            <SocialMediaForm
              embedded
              initial={initial}
              onSaveDraft={handleSaveDraft}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
