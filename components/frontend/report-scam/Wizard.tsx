"use client";
import React, { useState } from "react";
import Step1_Target from "./steps/Step1_Target";
import Step2_Incident from "./steps/Step2_Incident";
import Step3_Evidence from "./steps/Step3_Evidence";
import Step4_Details from "./steps/Step4_Details";
import Step5_Review from "./steps/Step5_Review";
import StepDivider from "./StepDivider";
import { ReportService } from "@/services/report/report";
const steps = [
  { id: 1, title: "Target Business/Person" },
  { id: 2, title: "Incident" },
  { id: 3, title: "Evidence" },
  { id: 4, title: "Your details" },
  { id: 5, title: "Review" },
];

export default function Wizard() {
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Record<string, any>>({
    targetName: "",
    targetType: "",
    bankName: "",
    bankAccountNumber: "",
    phoneNumber: "",
    websiteUrl: "",
    socialHandle: "",
    rcBnNumber: "",
    otherDetails: "",
    incidentTitle: "",
    incidentDate: "",
    incidentLocation: "",
    incidentDescription: "",
    amountLost: "",
    scamTypes: [] as string[],
    files: [] as any[], // may contain File objects or URLs
    chatText: "",
    transactionRef: "",
    proofType: "",
    evidenceLinks: "",
    reporterType: "anonymous",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
  });

  function go(next: number) {
    setActive(next);
  }

  function update(partial: Record<string, unknown>) {
    setData((d) => ({ ...d, ...partial }));
  }

  // ✅ Smart hybrid submission: JSON for text-only, FormData for files
  async function handleSubmit() {
    setLoading(true);
    try {
      let response;

      const hasFiles =
        Array.isArray(data.files) && data.files.some((f) => f instanceof File);

      if (hasFiles) {
        // Use FormData if files exist
        const formData = new FormData();

        for (const key in data) {
          if (key === "files" && Array.isArray(data.files)) {
            data.files.forEach((file: any) => {
              if (file instanceof File) {
                formData.append("files", file);
              } else if (typeof file === "string") {
                // URLs or previously uploaded file links
                formData.append("fileUrls", file);
              }
            });
          } else if (data[key] != null) {
            // Convert arrays and other types to strings safely
            if (Array.isArray(data[key])) {
              formData.append(key, JSON.stringify(data[key]));
            } else {
              formData.append(key, String(data[key]));
            }
          }
        }

        //response = await fetch("/api/reports", {
        //  method: "POST",
        //  body: formData,
        //});

        response = await ReportService.createReport(formData);
      } else {
        // Use JSON when there are no files
        //response = await fetch("/api/reports", {
        //  method: "POST",
        //  headers: {
        //    "Content-Type": "application/json",
        //  },
        //  body: JSON.stringify(data),
        //});
        response = await ReportService.createReport(data);
      }

      if (!response.success) throw new Error(`Error: ${response.message}`);

      // ReportService.createReport returns an ApiResponse (already parsed),
      // so use its data payload (or fallback to the whole response).
      const result = (response as any).data ?? response;
      console.log("✅ Report submitted successfully:", result);
      alert("Your report has been submitted successfully!");

      // Optional: Reset form
      setActive(1);
      setData((d) => ({
        ...d,
        files: [],
      }));
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("Failed to submit your report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 ">Report Scam</h2>
        <p className="text-gray-600 mt-2">
          Submit evidence so we can investigate and warn others.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="p-6">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((s, index) => {
              const isActive = s.id === active;
              const isCompleted = s.id < active;

              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center text-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200
                      ${
                        isActive
                          ? "bg-violet-600 text-white"
                          : isCompleted
                          ? "bg-violet-300 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.id}
                    </div>
                    <div
                      className={`text-sm font-medium mt-2 transition-colors duration-200 whitespace-nowrap truncate
                      ${isActive ? "text-violet-600" : "text-gray-500"}`}
                    >
                      {s.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <StepDivider active={index < active - 1} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Step content */}
          <div>
            {active === 1 && (
              <Step1_Target
                data={data}
                onNext={() => go(2)}
                onChange={(d) => update(d)}
              />
            )}
            {active === 2 && (
              <Step2_Incident
                data={data}
                onNext={() => go(3)}
                onPrev={() => go(1)}
                onChange={(d) => update(d)}
              />
            )}
            {active === 3 && (
              <Step3_Evidence
                data={data}
                onNext={() => go(4)}
                onPrev={() => go(2)}
                onChange={(d) => update(d)}
              />
            )}
            {active === 4 && (
              <Step4_Details
                data={data}
                onNext={() => go(5)}
                onPrev={() => go(3)}
                onChange={(d) => update(d)}
              />
            )}
            {active === 5 && (
              <Step5_Review
                data={data}
                onPrev={() => go(4)}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Optional loader */}
          {loading && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white p-5 rounded-lg shadow-md">
                <p className="text-gray-700">Submitting your report...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
