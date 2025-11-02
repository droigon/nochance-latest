// ...existing code...
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const DRAFT_KEY = "verification:representatives:draft";
const MAX_REPS = 5;

type Rep = { fullName: string; email: string; phone: string };

export default function RepresentativesPage() {
  const router = useRouter();
  const [reps, setReps] = useState<Rep[]>(() => [
    { fullName: "", email: "", phone: "" },
  ]);
  const [saving, setSaving] = useState(false);

  // load draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0)
          setReps(parsed.slice(0, MAX_REPS));
      }
    } catch {}
  }, []);

  // autosave (debounced)
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(reps));
      } catch {}
    }, 300);
    return () => window.clearTimeout(id);
  }, [reps]);

  // layout event listeners (save / continue / previous)
  useEffect(() => {
    const onSave = () => void handleSave();
    const onContinue = () => void handleContinue();
    const onPrevious = () => router.back();

    window.addEventListener("verification:save", onSave);
    window.addEventListener("verification:continue", onContinue);
    window.addEventListener("verification:previous", onPrevious);
    return () => {
      window.removeEventListener("verification:save", onSave);
      window.removeEventListener("verification:continue", onContinue);
      window.removeEventListener("verification:previous", onPrevious);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reps]);

  const updateRep = (index: number, patch: Partial<Rep>) =>
    setReps((s) => s.map((r, i) => (i === index ? { ...r, ...patch } : r)));

  const addRep = () => {
    setReps((s) =>
      s.length < MAX_REPS ? [...s, { fullName: "", email: "", phone: "" }] : s
    );
  };

  const removeRep = (index: number) => {
    setReps((s) => s.filter((_, i) => i !== index));
  };

  const validRepsCount = useMemo(
    () =>
      reps.filter((r) => r.fullName.trim() && r.email.trim() && r.phone.trim())
        .length,
    [reps]
  );

  const allValid =
    reps.length > 0 &&
    reps.every((r) => r.fullName.trim() && r.email.trim() && r.phone.trim());

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/verification/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "representatives", data: reps }),
      });
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(reps));
      } catch {}
      alert("Progress saved");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleContinue = async () => {
    // require at least one valid representative
    if (validRepsCount === 0) {
      alert("Add at least one representative with name, email and phone.");
      return;
    }

    // optionally persist to server, then navigate
    try {
      await fetch("/api/verification/representatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reps }),
      });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      router.push("/dashboard/verifications/representatives/documents");
    } catch (err) {
      console.error(err);
      alert("Could not continue. Try again.");
    }
  };

  return (
    <div className="py-12 min-h-[70vh]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-600 inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={() => void handleSave()}
            className="text-sm text-purple-600 hover:underline"
            disabled={saving}
          >
            Save & finish later
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-xs text-gray-400 mb-2">Step 1 of 3</div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Corporate Representatives
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Add the key representatives who will be responsible for your
            enterprise account. You can add up to 5 representatives.
          </p>
        </div>

        <div className="space-y-4">
          {reps.map((rep, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="font-medium">Representative {i + 1}</div>
                {reps.length > 1 && (
                  <button
                    onClick={() => removeRep(i)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-200 px-4 py-2"
                    placeholder="Enter full name"
                    value={rep.fullName}
                    onChange={(e) => updateRep(i, { fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Work Email
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 px-4 py-2"
                      placeholder="name@company.com"
                      value={rep.email}
                      onChange={(e) => updateRep(i, { email: e.target.value })}
                      inputMode="email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 px-4 py-2"
                      placeholder="+234 xxx xxx xxxx"
                      value={rep.phone}
                      onChange={(e) => updateRep(i, { phone: e.target.value })}
                      inputMode="tel"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={addRep}
              disabled={reps.length >= MAX_REPS}
              className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-md bg-white"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 5v14M5 12h14"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Add Another Representative
            </button>
            <div className="text-xs text-gray-500">
              {MAX_REPS - reps.length} more representative can be added
            </div>
          </div>

          <div className="p-4 rounded-md border border-blue-200 bg-blue-50 text-sm text-blue-800">
            <div className="font-medium mb-2">Required Documents</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Must be authorized signatories or key decision makers</li>
              <li>Will receive account notifications and updates</li>
              <li>Can perform transactions on behalf of the company</li>
              <li>Should have valid Nigerian phone numbers</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => void handleContinue()}
              disabled={!allValid}
              className={`px-6 py-2 rounded-full text-white ${allValid ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-200 cursor-not-allowed"}`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
