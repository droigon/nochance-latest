"use client";
import { Input, Textarea, PrimaryButton } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";

type WizardProps = {
  data?: Record<string, unknown>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (d: Record<string, unknown>) => void;
};

export default function Step2_Incident({
  data,
  onNext,
  onPrev,
  onChange,
}: WizardProps) {
  const incidentTitle = (data?.incidentTitle as string) || "";
  const incidentDate = (data?.incidentDate as string) || "";
  const incidentLocation = (data?.incidentLocation as string) || "";
  const incidentDescription = (data?.incidentDescription as string) || "";
  const amountLost = (data?.amountLost as string) || "";
  const scamTypes = (data?.scamTypes as string[]) || [];

  function toggleScamType(t: string) {
    const exists = scamTypes.includes(t);
    const next = exists ? scamTypes.filter((s) => s !== t) : [...scamTypes, t];
    onChange?.({ scamTypes: next });
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Incident Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Incident Title</label>
          <Input
            value={incidentTitle}
            onChange={(e) => onChange?.({ incidentTitle: e.target.value })}
            className="w-full mt-1"
            placeholder="Brief title for the incident"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            label="Date of Incident"
            value={incidentDate}
            onChange={(e) => onChange?.({ incidentDate: e.target.value })}
            className="w-full"
            placeholder="Select date"
          />
          <Input
            type="text"
            label="Location of Incident"
            value={incidentLocation}
            onChange={(e) => onChange?.({ incidentLocation: e.target.value })}
            className="w-full"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">
            Detailed Description
          </label>
          <Textarea
            value={incidentDescription}
            onChange={(e) =>
              onChange?.({ incidentDescription: e.target.value })
            }
            className="w-full mt-1"
            rows={6}
            placeholder="Describe exactly what happened"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Amount Lost (N)</label>
          <Input
            type="number"
            value={amountLost}
            onChange={(e) => onChange?.({ amountLost: e.target.value })}
            className="w-full mt-1"
            placeholder="Enter amount lost"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Scam Type(s)</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              "Non-delivery of goods/services",
              "Phishing/Identity theft",
              "Romance Scam",
              "Fake job offer",
              "Refund refused",
              "Investment fraud",
              "Advance fee fraud",
              "Cryptocurrency fraud",
              "Other",
            ].map((t) => (
              <label key={t} className="inline-flex items-center gap-2 text-sm">
                <Input
                  type="checkbox"
                  checked={scamTypes.includes(t)}
                  onChange={() => toggleScamType(t)}
                />

                {t}
              </label>
            ))}
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
