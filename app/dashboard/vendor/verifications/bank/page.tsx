"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import BankForm from "@/components/dashboard/components/forms/verification/BankAccountForm";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";
import { VerificationService } from "@/services/verifications/verifications";
import { useAuth } from "@/context/AuthContexts";
import { VerificationVerifyDto } from "@/dtos/verifications.dto";

export default function BankAccountPage() {
  const router = useRouter();
  const { vendorType, loading: vendorLoading } = useVendorType();
  const steps = useVerificationSteps(vendorType ?? "");
  const { business } = useAuth();

  const currentId = "BANK";
  const [initial, setInitial] = useState<Record<string, any> | undefined>();
  const [loading, setLoading] = useState(true);

  const { stepNumber, totalSteps, nextId } = useMemo(() => {
    const ids = steps.map((s) => s.id.toUpperCase());
    const idx = ids.indexOf(currentId);
    return {
      stepNumber: idx >= 0 ? idx + 1 : 1,
      totalSteps: ids.length > 0 ? ids.length : 1,
      nextId: idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null,
    };
  }, [steps]);

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
        const stepData = draft?.[currentId] ?? draft?.bank ?? {};
        setInitial(stepData);
      } catch (e) {
        console.error("❌ Load bank draft error:", e);
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
      console.error("❌ Save bank draft failed:", e);
    }
  };

  const handleVerifyAccount = async (bank: string, account: string) => {
    try {
      const businessId =
        business?.id ||
        (() => {
          try {
            const raw = localStorage.getItem("business");
            return raw ? JSON.parse(raw)?.id : null;
          } catch {
            return null;
          }
        })();

      if (!businessId) {
        console.error("❌ No businessId found for verification");
        return { success: false };
      }

      console.log("verify", bank, account);

      const verify: VerificationVerifyDto = {
        category: "BANK_ACCOUNT" as const,
        case: "BANK" as const,
        value: {
          accountNumber: account,
          bankCode: bank ?? "",
        },
      };

      const res = await VerificationService.verifyVerification(
        businessId,
        verify
      );
      console.log("verify-account response:", res);

      // If your service returns { success: true, message, data }
      if (!res.success) {
        console.error("verify-account failed:", res.message);
        return { success: false };
      }

      // Return consistent structure for BankForm
      const dataValue = Array.isArray(res.data) ? res.data[0] : res.data;
      return { success: true, data: dataValue };
    } catch (e) {
      console.error("verify-account error:", e);
      return { success: false };
    }
  };

  const handleNext = async (values?: Record<string, any>) => {
    const payload = values ?? {};
    //await handleSaveDraft(payload);
    console.log("Next step payload:", payload);

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
        await VerificationService.save(businessId, {
          category: "BANK_ACCOUNT",
          documents: {
            bankCode: payload.bank,
            accountNumber: payload.account,
            account_name: payload.account_name,
            //verifiedInfo: payload.verifiedInfo || null,
          },
        });
      } else {
        console.warn("No businessId found; only draft was saved.");
      }

      if (nextId) {
        router.push(`/dashboard/vendor/verifications/${nextId.toLowerCase()}`);
      } else {
        router.push(`/dashboard/vendor`);
      }
    } catch (e) {
      console.error("❌ Bank submission failed:", e);
      // keep user on page; page could surface error
    }
  };

  if (vendorLoading || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
        Loading bank verification…
      </main>
    );
  }

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

              <BankForm
                initial={initial}
                onVerifyAccount={handleVerifyAccount}
                onSaveDraft={handleSaveDraft}
                onNext={handleNext}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
