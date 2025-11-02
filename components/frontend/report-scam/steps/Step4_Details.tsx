"use client";
import { Input, PrimaryButton, Select } from "@/components/ui";
import { ArrowRight, ArrowLeft } from "lucide-react";

type WizardProps = {
  data?: Record<string, unknown>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (d: Record<string, unknown>) => void;
};

export default function Step4_Details({
  data,
  onNext,
  onPrev,
  onChange,
}: WizardProps) {
  const reporterType = (data?.reporterType as string) || "anonymous";
  const reporterName = (data?.reporterName as string) || "";
  const reporterEmail = (data?.reporterEmail as string) || "";
  const reporterPhone = (data?.reporterPhone as string) || "";
  const consent = (data?.consent as boolean) || false;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Reporter Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">
            How would you like to report this?
          </label>
          <div className="space-y-2 mt-2">
            <label className="block p-3 border rounded">
              <Input
                type="radio"
                name="reporterType"
                checked={reporterType === "anonymous"}
                onChange={() => onChange?.({ reporterType: "anonymous" })}
              />
              <input
                type="radio"
                name="reporterType"
                checked={reporterType === "anonymous"}
                onChange={() => onChange?.({ reporterType: "anonymous" })}
              />
              <div className="ml-3 inline-block">
                Anonymous Report{" "}
                <div className="text-xs text-gray-500">
                  Submit anonymously. You will get a tracking link but we cannot
                  contact you for follow-up
                </div>
              </div>
            </label>

            <label className="block p-3 border rounded">
              <Input
                type="radio"
                name="reporterType"
                checked={reporterType === "pseudonymous"}
                onChange={() => onChange?.({ reporterType: "pseudonymous" })}
              />

              <div className="ml-3 inline-block">
                Contactable Report{" "}
                <div className="text-xs text-gray-500">
                  Provide contact details so we can reach you
                </div>
              </div>
            </label>
          </div>
        </div>

        {reporterType === "contactable" && (
          <div>
            <label className="block text-sm text-gray-700">Full Name</label>
            <Input
              type="text"
              value={reporterName}
              onChange={(e) => onChange?.({ reporterName: e.target.value })}
              className="w-full mt-1"
              placeholder="Enter your full name"
            />

            <div className="grid grid-cols-2 gap-3 mt-3">
              <Input
                type="email"
                value={reporterEmail}
                onChange={(e) => onChange?.({ reporterEmail: e.target.value })}
                className="w-full"
                placeholder="Email Address"
              />
              <Input
                type="text"
                value={reporterPhone}
                onChange={(e) => onChange?.({ reporterPhone: e.target.value })}
                className="w-full"
                placeholder="Phone Number"
              />
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Input
            type="checkbox"
            checked={consent}
            onChange={(e) => onChange?.({ consent: e.target.checked })}
          />
          <div className="text-sm text-gray-700">
            I confirm that the details provided are true to the best of my
            knowledge and consent to storage and sharing for investigation
            purposes.
          </div>
        </div>

        <div className="text-yellow-800 bg-yellow-50 border border-yellow-200 p-4 rounded">
          <strong>Legal Notice</strong>
          <div className="text-sm mt-2">
            Submitting false claims may lead to penalties under applicable law.
            Please ensure all information is accurate.
          </div>
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
