"use client";
import { PrimaryButton } from "@/components/ui";
import { ArrowLeft, Send, FileText, File as FileIcon } from "lucide-react";
import React from "react";

type WizardProps = {
  data?: Record<string, any>;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
};

export default function Step5_Review({
  data = {},
  onPrev,
  onSubmit,
}: WizardProps) {
  const show = (value: any) => {
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "string") return value || "-";
    if (value === undefined || value === null) return "-";
    return String(value);
  };

  const files = Array.isArray(data.files) ? data.files : [];
  const isBrowser =
    typeof window !== "undefined" && typeof File !== "undefined";

  const renderFile = (file: any, index: number) => {
    const fileName =
      file?.name ||
      (typeof file === "string" ? file.split("/").pop() : `File ${index + 1}`);

    const isImage =
      (file?.type?.startsWith?.("image/") ||
        /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) &&
      (typeof file === "string" || (isBrowser && file instanceof File));

    const isPDF =
      file?.type === "application/pdf" ||
      (typeof fileName === "string" && /\.pdf$/i.test(fileName));

    let previewUrl: string | null = null;
    if (typeof file === "string") {
      previewUrl = file;
    } else if (isBrowser && (file instanceof File || file instanceof Blob)) {
      previewUrl = URL.createObjectURL(file);
    } else if (file?.preview) {
      previewUrl = file.preview;
    }

    return (
      <div
        key={index}
        className="flex items-center gap-3 bg-white p-2 rounded border border-gray-200"
      >
        {isImage && previewUrl ? (
          <img
            src={previewUrl}
            alt={fileName}
            className="w-12 h-12 object-cover rounded-md border"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : isPDF ? (
          <FileText className="w-8 h-8 text-red-500" />
        ) : (
          <FileIcon className="w-8 h-8 text-gray-400" />
        )}
        <span className="text-sm text-gray-700 truncate">{fileName}</span>
      </div>
    );
  };

  const nonFileEntries = Object.entries(data).filter(([k]) => k !== "files");

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[60vh]">
      {/* Header */}
      <div className="flex-shrink-0">
        <h3 className="text-xl font-semibold mb-3">Review &amp; Submit</h3>
        <p className="text-gray-600 mb-5 text-sm">
          Please review your report before submitting. Once submitted, you
          cannot edit the information.
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-4">
        {nonFileEntries.map(([key, value]) => (
          <div key={key}>
            <span className="font-medium text-gray-800 block capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <span className="text-gray-700 text-sm">{show(value)}</span>
          </div>
        ))}

        <div>
          <span className="font-medium text-gray-800 block">Evidence</span>
          {files.length > 0 ? (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {files.map(renderFile)}
            </div>
          ) : (
            <span className="text-gray-500 text-sm">No files uploaded</span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex-shrink-0 mt-6 flex items-center justify-between">
        <PrimaryButton variant="light" onClick={onPrev}>
          <ArrowLeft /> Previous
        </PrimaryButton>

        <div className="flex items-center gap-3">
          <PrimaryButton
            variant="light"
            onClick={() => console.log("Save Draft")}
          >
            Save Draft (Sign in required)
          </PrimaryButton>
          <PrimaryButton variant="solidRounded" onClick={onSubmit}>
            <Send /> Submit Report
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
