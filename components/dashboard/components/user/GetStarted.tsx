"use client";
import { useState } from "react";
import { PrimaryButton } from "@/components/ui";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/cards/card";
import { ShieldCheck, X } from "lucide-react";

import { useAuth } from "@/context/AuthContexts";
export default function GetStarted() {
  const [isVisible, setIsVisible] = useState(true);

  const { user } = useAuth();
  console.log("GetStarted user:", user);

  // Don't render if closed
  if (!isVisible) {
    return null;
  }

  // Only display if user has kyc.status = true
  if (user?.kyc?.status === "APPROVED" || user?.kyc?.status === "PENDING") {
    return null;
  }

  return (
    <div className=" bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto space-y-6 px-4">
        {/* Verified Reviewer Banner */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-3 flex items-start justify-between">
            <div className="flex-1">
              <div className="h-12 w-12 bg-[#EFFEF6] rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 12 13"
                  fill="none"
                >
                  <path
                    d="M5.57129 0C5.77387 5.68447e-05 5.98101 0.0622359 6.19141 0.141602C6.40445 0.221966 6.67014 0.340987 7.00195 0.488281C7.48973 0.704809 8.13368 0.95312 8.82422 1.14941C9.32808 1.29264 9.73534 1.40866 10.0439 1.52832C10.3541 1.64859 10.6359 1.79724 10.8252 2.04785C11.0085 2.29051 11.0789 2.57416 11.1113 2.87988C11.1426 3.17506 11.1426 3.54572 11.1426 3.99414V5.67676C11.1425 7.42291 10.354 8.80781 9.40137 9.83984C8.45164 10.8686 7.31993 11.5684 6.57422 11.9619L6.53809 11.9814C6.22078 12.1492 5.96118 12.2861 5.57129 12.2861C5.18111 12.2861 4.92105 12.1493 4.60352 11.9814L4.56738 11.9619C3.82163 11.5683 2.68994 10.8687 1.74023 9.83984C0.787567 8.80781 4.33742e-05 7.42289 0 5.67676V3.99414C-9.2376e-06 3.54572 -1.69948e-05 3.17506 0.03125 2.87988C0.0636547 2.57417 0.134092 2.29051 0.317383 2.04785C0.506636 1.79743 0.787678 1.64854 1.09766 1.52832C1.4062 1.40868 1.81363 1.29261 2.31738 1.14941C3.00777 0.953161 3.65191 0.704777 4.13965 0.488281C4.47152 0.340961 4.73811 0.22197 4.95117 0.141602C5.16153 0.0622734 5.36875 0 5.57129 0ZM8.9668 4.23828C8.86141 3.94085 8.53476 3.78528 8.2373 3.89062C7.73556 4.06835 7.25587 4.40724 6.83496 4.77637C6.4082 5.15064 6.0089 5.58489 5.66992 5.99121C5.4189 6.29212 5.1967 6.58296 5.0166 6.8291C4.85162 6.63151 4.68795 6.48632 4.53125 6.38184C4.37445 6.2773 4.17204 6.14355 3.85645 6.14355C3.54099 6.14371 3.28517 6.39935 3.28516 6.71484C3.28516 7.01239 3.51321 7.25721 3.80371 7.28418C3.92072 7.29588 4.23684 7.61042 4.48828 8.11328C4.58038 8.29749 4.76503 8.41818 4.9707 8.42871C5.17614 8.4391 5.37104 8.33763 5.48145 8.16406C5.48145 8.16406 5.68101 7.86515 5.77539 7.73145C5.96455 7.46349 6.23266 7.10146 6.54785 6.72363C6.86425 6.34438 7.22167 5.95777 7.58887 5.63574C7.96201 5.30851 8.31423 5.07576 8.61914 4.96777C8.9165 4.86234 9.07213 4.5357 8.9668 4.23828Z"
                    fill="#0AB360"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">
                  Become a verified reviewer
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                All you need is a NIN. Verifying helps ensure real people are
                writing the reviews you read, builds trust online, and lets
                everyone shop with confidence and avoid scams.
                <br />
                Your ID will never be shown on Nochance — we’ll only display a
                verification badge.
              </p>

              <PrimaryButton className="mt-8" variant="solidRounded">
                Get Started
              </PrimaryButton>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
