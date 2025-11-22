"use client";

import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { PrimaryButton } from "@/components/ui";

export default function VerificationBanner() {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Become a Verified User
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Verifying your identity helps ensure safe transactions on
              Nochance. Verified users can leave trusted reviews, report scams
              and scammers, and enjoy added protection.
            </p>
            <PrimaryButton variant="pillSolid" className="text-sm px-4 py-2">
              Get Verified
            </PrimaryButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
