"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/dashboard/components/dashboard/Header";
import Sidebar from "@/components/dashboard/components/dashboard/Sidebar";
import Checklist from "@/components/dashboard/components/dashboard/Checklist";
import RightPanel from "@/components/dashboard/components/dashboard/RightPanel";
import { useAuth } from "@/context/AuthContexts";
import { useVendorType } from "@/hooks/useVendorTypes";
import { useVerificationSteps } from "@/hooks/useVerificationSteps";

export default function DashboardPage() {
  const { business } = useAuth();
  const { vendorType, loading: vendorLoading } = useVendorType();
  const filteredSteps = useVerificationSteps(vendorType ?? "");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vendorLoading || !business?.id) return;

    const loadBusiness = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/business/${business.id}`, {
          headers: { Accept: "application/json" },
          credentials: "include",
        });

        const json = await res.json();
        const verifications = json?.data?.verifications ?? [];

        // Mark completed steps
        const map: Record<string, boolean> = {};
        filteredSteps.forEach((step) => {
          const match = verifications.find(
            (v: any) => v.category.toUpperCase() === step.id.toUpperCase()
          );
          map[step.id] = !!match && match.status === "APPROVED";
        });

        setCompleted(map);
      } catch (e) {
        console.error("❌ Failed to load business verifications:", e);
        setCompleted({});
      } finally {
        setLoading(false);
      }
    };

    loadBusiness();
  }, [vendorType, vendorLoading, business?.id, filteredSteps]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header userName="Benny Mulla" />
        <main className="p-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
              <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 mb-6">
                <div className="text-sm text-yellow-800">
                  Finish setting up your account to start getting reviews and
                  inviting customers.
                </div>
              </div>

              {loading || vendorLoading ? (
                <div className="bg-white rounded-xl shadow p-6 mb-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="space-y-3">
                    {Array.from({
                      length: Math.max(3, filteredSteps.length || 3),
                    }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 h-12 bg-gray-100 rounded px-4"
                      >
                        <div className="w-8 h-8 bg-gray-300 rounded-full" />
                        <div className="h-4 bg-gray-300 rounded w-2/3" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Checklist steps={filteredSteps} completed={completed} />
              )}
            </div>

            <div className="col-span-3">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
