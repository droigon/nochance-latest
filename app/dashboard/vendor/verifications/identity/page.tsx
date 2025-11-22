"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import IdentifyForm from "@/components/dashboard/components/forms/verification/IdentifyForm";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";
import { VerificationService } from "@/services/verifications/verifications";
import { useAuth } from "@/context/AuthContexts";

type Draft = {
  nin?: string;
  ninVerified?: boolean;
  bvn?: string;
  bvnVerified?: boolean;
};

export default function IdentityPage() {
  const router = useRouter();
  const { business } = useAuth();
  const { vendorType, loading: vendorLoading } = useVendorType();
  const steps = useVerificationSteps(vendorType ?? "");

  const currentId = "IDENTITY";
  const [initial, setInitial] = useState<Draft | undefined>();
  const [loading, setLoading] = useState(true);

  // compute step meta
  const { stepNumber, totalSteps, nextId } = useMemo(() => {
    const ids = steps.map((s) => s.id.toUpperCase());
    const idx = ids.indexOf(currentId);
    return {
      stepNumber: idx >= 0 ? idx + 1 : 1,
      totalSteps: ids.length > 0 ? ids.length : 1,
      nextId: idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null,
    };
  }, [steps]);

  // load draft for identity
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
          }
        );
        if (!resp.ok) throw new Error("Failed to fetch draft");
        const json = await resp.json();
        if (cancelled) return;
        const draft = json?.data ?? json ?? {};
        setInitial(draft?.IDENTITY ?? draft?.identity ?? {});
      } catch (e) {
        console.error("Load identity draft error:", e);
        if (!cancelled) setInitial(undefined);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [vendorType, vendorLoading]);

  const handleSaveDraft = async (values: Draft) => {
    if (!vendorType) return;
    try {
      await fetch(`/api/v1/verification/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ vendorType, step: currentId, values }),
      });
    } catch (e) {
      console.error("❌ Save identity draft failed:", e);
    }
  };

  const verifyNin = async (nin: string) => {
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
    if (!businessId) throw new Error("Missing business id");
    try {
      const verify = {
        category: "IDENTITY" as const,
        case: "NIN" as const,
        value: nin,
      };
      const res = await VerificationService.verifyVerification(
        businessId,
        verify
      );
      if (!res.success) throw new Error("Verify request failed");
      return { success: Boolean(res.success), data: res.data };
    } catch (e) {
      console.error("NIN verify error:", e);
      return { success: false };
    }
  };

  const verifyBvn = async (bvn: string) => {
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
    if (!businessId) throw new Error("Missing business id");
    try {
      const verify = {
        category: "IDENTITY" as const,
        case: "BVN" as const,
        value: bvn,
      };
      const res = await VerificationService.verifyVerification(
        businessId,
        verify
      );
      if (!res.success) throw new Error("Verify request failed");
      return { success: Boolean(res.success) };
    } catch (e) {
      console.error("BVN verify error:", e);
      return { success: false };
    }
  };

  const handleNext = async (values: Draft, file?: File | null) => {
    // save draft first
    await handleSaveDraft(values);

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

    try {
      if (businessId) {
        // if a file is present upload as multipart; otherwise use generic save
        if (file) {
          const fd = new FormData();
          if (values.nin) fd.append("nin", values.nin);
          fd.append("ninVerified", String(Boolean(values.ninVerified)));
          if (values.bvn) fd.append("bvn", values.bvn);
          fd.append("bvnVerified", String(Boolean(values.bvnVerified)));
          fd.append("category", "IDENTITY");
          fd.append("file", file);

          const res = await fetch(
            `/api/v1/verification/${encodeURIComponent(businessId)}/identity`,
            {
              method: "POST",
              body: fd,
              credentials: "include",
            }
          );
          if (!res.ok) throw new Error(await res.text());
        } else {
          // no file -> send normalized payload
          await VerificationService.save(businessId, {
            category: "IDENTITY",
            documents: {
              nin: values.nin ?? "",
              //ninVerified: Boolean(values.ninVerified),
              bvn: values.bvn ?? "",
              //bvnVerified: Boolean(values.bvnVerified),
            },
          });
        }
      } else {
        console.warn("No businessId found; only draft was saved.");
      }

      // navigate to next step
      if (nextId) {
        router.push(`/dashboard/vendor/verifications/${nextId.toLowerCase()}`);
      } else {
        router.push(`/dashboard/vendor`);
      }
    } catch (e) {
      console.error("❌ Identity submission failed:", e);
      throw e;
    }
  };

  if (vendorLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading identity verification…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-xs text-gray-400 mb-2">
              Step {stepNumber} of {totalSteps}
            </div>
          </div>

          <IdentifyForm
            initial={initial}
            onVerifyNin={async (n) => verifyNin(n)}
            onVerifyBvn={async (b) => verifyBvn(b)}
            onSaveDraft={handleSaveDraft}
            onNext={handleNext}
          />
        </div>
      </div>
    </main>
  );
}
