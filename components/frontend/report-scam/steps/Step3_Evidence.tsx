"use client";
import React from "react";
import { Input, Textarea, PrimaryButton, Select } from "@/components/ui";
import { ArrowRight, ArrowLeft } from "lucide-react";
import EvidenceUpload from "../../../ui/upload";

type WizardProps = {
  data?: Record<string, unknown>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (d: Record<string, unknown>) => void;
};
interface UploadedFile {
  name: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
}

export default function Step3_Evidence({
  data,
  onNext,
  onPrev,
  onChange,
}: WizardProps) {
  const files = (data?.files as UploadedFile[]) || [];
  const chatText = (data?.chatText as string) || "";
  const transactionRef = (data?.transactionRef as string) || "";
  const proofType = (data?.proofType as string) || "";
  const evidenceLinks = (data?.evidenceLinks as string) || "";

  return (
    <div>
      <h3 className="text-xl font-semibold ">Evidence upload</h3>
      <p>
        Upload any evidence you have. This helps us investigate your report more
        effectively.
      </p>
      <div className="space-y-4">
        <EvidenceUpload
          value={files}
          onChange={(updatedFiles) => onChange?.({ files: updatedFiles })}
        />

        <div>
          <label className="block text-sm text-gray-700">
            Chat/Text messages
          </label>
          <Textarea
            value={chatText}
            onChange={(e) => onChange?.({ chatText: e.target.value })}
            className="w-full mt-1 border border-gray-200 rounded px-3 py-2"
            rows={4}
            placeholder="Paste chat or text message excerpts related to the scam"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            value={transactionRef}
            onChange={(e) => onChange?.({ transactionRef: e.target.value })}
            placeholder="Transactions reference"
            className="bg-white border border-gray-200 px-3 py-2 rounded"
          />
          <Select
            value={proofType}
            onValueChange={(value: string) => onChange?.({ proofType: value })}
            placeholder="Type of Proof"
            options={[
              { value: "Bank Statement", label: "Bank Statement" },
              { value: "Payment Receipt", label: "Payment Receipt" },
              { value: "Email Correspondence", label: "Email Correspondence" },
              { value: "Other", label: "Other" },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Evidence Links</label>
          <Textarea
            value={evidenceLinks}
            onChange={(e) => onChange?.({ evidenceLinks: e.target.value })}
            className="w-full mt-1 border border-gray-200 rounded px-3 py-2"
            rows={2}
            placeholder="URLs to websites, social media profiles, or other online evidence"
          />
        </div>

        <div className="flex mt-8 justify-between">
          <PrimaryButton variant="light" onClick={onPrev}>
            <ArrowLeft />
            Previous
          </PrimaryButton>

          <PrimaryButton variant="solidRounded" onClick={onNext}>
            Next
            <ArrowRight />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
