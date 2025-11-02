"use client";

import { Input, Select, PrimaryButton } from "@/components/ui";
import { ArrowRight } from "lucide-react";
type WizardProps = {
  data?: Record<string, unknown>;
  onNext?: () => void;
  onPrev?: () => void;
  onChange?: (d: Record<string, unknown>) => void;
};

export default function Step1_Target({ data, onNext, onChange }: WizardProps) {
  const targetName = (data?.targetName as string) || "";
  const targetType = (data?.targetType as string) || "";

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Target Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            Business/Person Name
          </label>
          <Input
            value={targetName}
            onChange={(e) => onChange?.({ targetName: e.target.value })}
            placeholder="Enter the business name or person"
          />
        </div>

        <div>
          <label className="block text-sm  mb-2 text-gray-700">
            Target Type
          </label>
          <Select
            options={[
              { value: "Bank Account", label: "Bank Account" },
              { value: "Phone Number", label: "Phone Number" },
              { value: "Website", label: "Website" },
              { value: "Social Media", label: "Social Media" },
              { value: "RC/BN Number", label: "RC/BN Number" },
              { value: "Other", label: "Other" },
            ]}
            placeholder="Select an option"
            value={targetType}
            onValueChange={(value) => onChange?.({ targetType: value })}
          />
        </div>

        {/* Conditional subforms */}
        {targetType === "Bank Account" && (
          <div className="">
            <label className="block text-sm  mb-2 text-gray-700">
              Bank Name
            </label>
            <Input
              value={(data?.bankName as string) || ""}
              onChange={(e) => onChange?.({ bankName: e.target.value })}
            />

            <label className="block text-sm mb-2 text-gray-700 mt-3">
              Account Number
            </label>
            <Input
              value={(data?.accountNumber as string) || ""}
              onChange={(e) => onChange?.({ accountNumber: e.target.value })}
            />
          </div>
        )}

        {targetType === "Phone Number" && (
          <div className="">
            <label className="block text-sm  mb-2 text-gray-700">
              Phone Number
            </label>
            <Input
              value={(data?.phoneNumber as string) || ""}
              onChange={(e) => onChange?.({ phoneNumber: e.target.value })}
            />
          </div>
        )}

        {targetType === "Website" && (
          <div className="">
            <label className="block text-sm  mb-2 text-gray-700">
              Website URL
            </label>
            <Input
              value={(data?.websiteUrl as string) || ""}
              onChange={(e) => onChange?.({ websiteUrl: e.target.value })}
            />
          </div>
        )}

        {targetType === "Social Media" && (
          <div className="">
            <label className="block text-sm mb-2  text-gray-700">
              Profile Handle / URL
            </label>
            <Input
              value={(data?.socialHandle as string) || ""}
              onChange={(e) => onChange?.({ socialHandle: e.target.value })}
            />
          </div>
        )}

        {targetType === "RC/BN Number" && (
          <div className="">
            <label className="block text-sm  mb-2 text-gray-700">
              RC/BN Number
            </label>
            <Input
              value={(data?.rcBnNumber as string) || ""}
              onChange={(e) => onChange?.({ rcBnNumber: e.target.value })}
            />
          </div>
        )}

        {targetType === "Other" && (
          <div className="">
            <label className="block text-sm mb-2  text-gray-700">
              Other details
            </label>
            <Input
              value={(data?.otherDetails as string) || ""}
              onChange={(e) => onChange?.({ otherDetails: e.target.value })}
              placeholder="Provide additional details"
            />
          </div>
        )}

        <div className="text-right">
          <PrimaryButton
            variant="solidRounded"
            className="mr-2"
            onClick={onNext}
          >
            Next
            <ArrowRight className="ml-2" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
