"use client";
import { useRouter } from "next/navigation";
import CACForm, {
  type CACFormData,
} from "@/components/dashboard/components/forms/verification/CACForm";

export default function CACPage() {
  const router = useRouter();

  const previous = () => {
    router.back();
  };

  // example save endpoint - adjust to your API
  const saveProgress = async (data: CACFormData) => {
    await fetch("/api/verification/save-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: "cac", data }),
    });
  };

  // example submit endpoint - upload file using FormData
  const submitCAC = async (data: CACFormData) => {
    const fd = new FormData();
    fd.append("registrationType", data.registrationType);
    fd.append("businessName", data.businessName);
    fd.append("rcNumber", data.rcNumber);
    if (data.file) fd.append("file", data.file);

    const res = await fetch("/api/verification/cac", {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || "Submission failed");
    }

    // navigate to next step (liveness) - replace with your route
    router.push("/dashboard/verifications/liveness");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Top controls row */}
        <div className="flex items-center justify-between py-6 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={previous}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              onClick={() => router.push("/dashboard")}
            >
              ×
            </button>

            <button
              onClick={() =>
                // quick save of empty progress, you can read saved draft then open form with initial
                saveProgress({
                  registrationType: "RC",
                  businessName: "",
                  rcNumber: "",
                  file: null,
                })
              }
              className="text-sm text-purple-600 hover:underline"
            >
              Save & finish later
            </button>
          </div>
        </div>

        <div className="border-t border-dashed border-purple-200/40" />

        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-full max-w-2xl">
            <CACForm
              onSave={async (data) => {
                try {
                  await saveProgress(data);
                } catch (err) {
                  console.error(err);
                  alert("Save failed");
                }
              }}
              onNext={async (data) => {
                try {
                  await submitCAC(data);
                } catch (err) {
                  console.error(err);
                  alert("Submission failed");
                }
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
