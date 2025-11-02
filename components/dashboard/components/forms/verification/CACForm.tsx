// ...existing code...
"use client";
import { useState, useRef } from "react";

export type CACFormData = {
  registrationType: "RC" | "BN";
  businessName: string;
  rcNumber: string;
  file: File | null;
};

export default function CACForm({
  initial,
  onSave,
  onNext,
}: {
  initial?: Partial<CACFormData>;
  onSave: (data: CACFormData) => Promise<void> | void;
  onNext: (data: CACFormData) => Promise<void> | void;
}) {
  const [form, setForm] = useState<CACFormData>({
    registrationType: (initial?.registrationType as "RC" | "BN") || "RC",
    businessName: initial?.businessName || "",
    rcNumber: initial?.rcNumber || "",
    file: initial?.file || null,
  });
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const pickFile = () => fileRef.current?.click();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, file: e.target.files?.[0] || null }));

  const validate = () => {
    if (!form.businessName.trim()) return "Business name is required";
    if (!form.rcNumber.trim()) return "RC / BN number is required";
    return null;
  };

  return (
    <form
      className="bg-white rounded-xl shadow py-10 px-8"
      onSubmit={async (e) => {
        e.preventDefault();
        const err = validate();
        if (err) return alert(err);
        setLoading(true);
        try {
          await onNext(form);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="text-center mb-6">
        <div className="text-xs text-gray-400 mb-2">Step 4 of 5</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          CAC Registration Details
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Please provide your Corporate Affairs Commission (CAC) registration
          information.
        </p>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="regType"
            checked={form.registrationType === "RC"}
            onChange={() => setForm({ ...form, registrationType: "RC" })}
          />
          <span className="text-sm">RC (Limited Company)</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="radio"
            name="regType"
            checked={form.registrationType === "BN"}
            onChange={() => setForm({ ...form, registrationType: "BN" })}
          />
          <span className="text-sm">BN (Business Name)</span>
        </label>
      </div>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            placeholder="Enter your registered business name"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            RC Number
          </label>
          <input
            type="text"
            value={form.rcNumber}
            onChange={(e) => setForm({ ...form, rcNumber: e.target.value })}
            placeholder="RC123456"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
        </div>

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

            <div className="text-sm text-gray-500">
              {form.file ? form.file.name : "No file chosen"}
            </div>
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

      <div className="border rounded-lg border-blue-200 p-4 mb-4 bg-blue-50">
        <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
          <li>Certificate of Incorporation (for RC)</li>
          <li>Business Name Certificate (for BN)</li>
          <li>Form CAC 2 (Particulars of Directors)</li>
          <li>Form CAC 7 (Particulars of Company Secretary)</li>
        </ul>
      </div>

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
            all information with the Corporate Affairs Commission database.
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={async () => {
            const err = validate();
            if (err) return alert(err);
            setLoading(true);
            try {
              await onSave(form);
              alert("Progress saved");
            } catch (err) {
              console.error(err);
              alert("Save failed");
            } finally {
              setLoading(false);
            }
          }}
          className="mr-4 inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg"
        >
          Save & finish later
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </form>
  );
}
