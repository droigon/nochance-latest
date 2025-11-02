"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "../../ui";

type Props = {
  initial?: Record<string, any>;
  onContinue?: (values: Record<string, any>) => Promise<any>;
};

export default function CACDetailsForm({ initial = {}, onContinue }: Props) {
  const [form, setForm] = useState({
    type: (initial?.type as "RC" | "BN") || "RC",
    name: initial?.name || "",
    number: initial?.number || "",
    //file: null as File | null,
  });

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial && Object.keys(initial).length > 0) {
      setForm((prev) => ({ ...prev, ...initial }));
    }
  }, [initial]);

  const pickFile = () => fileRef.current?.click();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, file: e.target.files?.[0] || null }));

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = useCallback(async () => {
    if (submitting || !onContinue) return;
    if (!form.name.trim()) return alert("Business name is required");
    if (!form.number.trim()) return alert("RC / BN number is required");
    setSubmitting(true);
    await onContinue(form);
    setSubmitting(false);
  }, [form, onContinue, submitting]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-900">
        CAC Registration Details
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2 mb-6">
        Provide your Corporate Affairs Commission (CAC) registration details
      </p>

      {/* Registration Type */}
      <div className="flex items-center gap-6 mb-6">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="regType"
            checked={form.type === "RC"}
            onChange={() => handleChange("type", "RC")}
          />
          <span className="text-sm">RC (Limited Company)</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="regType"
            checked={form.type === "BN"}
            onChange={() => handleChange("type", "BN")}
          />
          <span className="text-sm">BN (Business Name)</span>
        </label>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <Input
            type="text"
            placeholder="Enter your registered business name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RC Number
          </label>
          <Input
            type="text"
            placeholder="RC123456"
            value={form.number}
            onChange={(e) => handleChange("number", e.target.value)}
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CAC Certificate
          </label>

          <div
            onClick={pickFile}
            className="flex items-center justify-between w-full rounded-lg border border-gray-200 bg-white px-4 py-4 cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-purple-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0l3-3m-3 3l-3-3M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-800">
                  Click to upload
                </div>
                <div className="text-xs text-gray-500">
                  File type PDF (max 5mb)
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500"></div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="border rounded-lg border-blue-200 p-4 mb-4 bg-blue-50">
        <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
          <li>Certificate of Incorporation (for RC)</li>
          <li>Business Name Certificate (for BN)</li>
          <li>Form CAC 2 (Particulars of Directors)</li>
          <li>Form CAC 7 (Company Secretary Details)</li>
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="flex items-start gap-3 mb-6">
        <div className="p-3 rounded-full bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2c0-1.657 1.343-3 3-3h3z"
            />
          </svg>
        </div>
        <div className="text-sm text-gray-700">
          <div className="font-medium">Privacy & Security</div>
          <div className="text-gray-500">
            Your business documents are encrypted and stored securely. We verify
            all information with the CAC database.
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 shadow-md disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
