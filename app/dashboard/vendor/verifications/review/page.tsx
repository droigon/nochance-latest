"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type IdentityDraft = {
  nin?: string;
  ninVerified?: boolean;
  bvn?: string;
  bvnVerified?: boolean;
};
type PhoneDraft = { phone?: string; verified?: boolean };
type BankDraft = {
  bank?: string;
  account?: string;
  verifiedInfo?: { name?: string; bank?: string; account?: string };
};
type CacDraft = {
  businessName?: string;
  regNumber?: string;
  certificateUploaded?: boolean;
};

const ID_DRAFT = "verification:identity:draft";
const PHONE_DRAFT = "verification:phone:draft";
const BANK_DRAFT = "verification:bank:draft";
const CAC_DRAFT = "verification:cac:draft";

const mask = (value?: string, showLeft = 0, showRight = 2) => {
  if (!value) return "";
  const v = String(value);
  const left = v.slice(0, showLeft);
  const right = v.slice(Math.max(v.length - showRight, 0));
  const masked = v
    .slice(left.length, Math.max(v.length - right.length, 0))
    .replace(/./g, "*");
  return `${left}${masked}${right}`;
};

export default function ReviewForm() {
  const router = useRouter();

  const [identity, setIdentity] = useState<IdentityDraft>({});
  const [phone, setPhone] = useState<PhoneDraft>({});
  const [bank, setBank] = useState<BankDraft>({});
  const [cac, setCac] = useState<CacDraft>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const rawId = localStorage.getItem(ID_DRAFT);
      if (rawId) setIdentity(JSON.parse(rawId));
    } catch {}
    try {
      const rawPhone = localStorage.getItem(PHONE_DRAFT);
      if (rawPhone) setPhone(JSON.parse(rawPhone));
    } catch {}
    try {
      const rawBank = localStorage.getItem(BANK_DRAFT);
      if (rawBank) setBank(JSON.parse(rawBank));
    } catch {}
    try {
      const rawCac = localStorage.getItem(CAC_DRAFT);
      if (rawCac) setCac(JSON.parse(rawCac));
    } catch {}
  }, []);

  const goTo = (path: string) => router.push(path);

  const handleComplete = async () => {
    setSubmitting(true);
    try {
      // finalise onboarding on server
      const res = await fetch("/api/verification/complete", { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      // clear local drafts
      try {
        localStorage.removeItem(ID_DRAFT);
        localStorage.removeItem(PHONE_DRAFT);
        localStorage.removeItem(BANK_DRAFT);
        localStorage.removeItem(CAC_DRAFT);
      } catch {}
      router.push("/dashboard/verifications/success");
    } catch (err) {
      console.error(err);
      alert("Could not complete onboarding. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-xs text-gray-400 mb-2">Review</div>
          <h2 className="text-2xl font-semibold text-gray-900">Review</h2>
          <p className="text-sm text-gray-500 mt-2">
            Please review your information and provide your consent to complete
            the onboarding process.
          </p>
        </div>

        <div className="space-y-4">
          {/* Personal / Identity */}
          <section className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="font-medium">Verification</div>
              <button
                onClick={() => goTo("/dashboard/verifications/identity")}
                className="text-sm text-purple-600"
              >
                Edit
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <div>NIN:</div>
                <div className="text-right">
                  {identity.nin ? mask(identity.nin, 0, 3) : "—"}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div>BVN:</div>
                <div className="text-right">
                  {identity.bvn ? mask(identity.bvn, 0, 3) : "—"}
                </div>
              </div>
            </div>
          </section>

          {/* Phone */}
          <section className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="font-medium">Phone</div>
              <button
                onClick={() => goTo("/dashboard/verifications/phone")}
                className="text-sm text-purple-600"
              >
                Edit
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <div>Phone Number:</div>
                <div className="text-right">{phone.phone || "—"}</div>
              </div>
            </div>
          </section>

          {/* Bank */}
          <section className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="font-medium">Bank Account</div>
              <button
                onClick={() => goTo("/dashboard/verifications/bank")}
                className="text-sm text-purple-600"
              >
                Edit
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700 grid grid-cols-2 gap-2">
              <div>Account Name:</div>
              <div className="text-right">{bank.verifiedInfo?.name ?? "—"}</div>

              <div>Account Number:</div>
              <div className="text-right">
                {bank.verifiedInfo?.account
                  ? mask(bank.verifiedInfo.account, 0, 4)
                  : bank.account
                  ? mask(bank.account, 0, 4)
                  : "—"}
              </div>

              <div>Bank:</div>
              <div className="text-right">
                {bank.verifiedInfo?.bank ?? bank.bank ?? "—"}
              </div>
            </div>
          </section>

          {/* CAC */}
          <section className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex justify-between items-start">
              <div className="font-medium">CAC Registration</div>
              <button
                onClick={() => goTo("/dashboard/verifications/cac")}
                className="text-sm text-purple-600"
              >
                Edit
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700 grid grid-cols-2 gap-2">
              <div>Business Name:</div>
              <div className="text-right">{cac.businessName ?? "—"}</div>

              <div>Registration Number:</div>
              <div className="text-right">{cac.regNumber ?? "—"}</div>

              <div>Certificate:</div>
              <div className="text-right">
                {cac.certificateUploaded ? "Uploaded" : "—"}
              </div>
            </div>
          </section>

          {/* Consent */}
          <section className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="font-medium mb-3">Consent & Agreements</div>
            <div className="space-y-2 text-sm text-gray-700">
              <label className="flex items-start gap-3">
                <input type="checkbox" />{" "}
                <span>I agree to the Terms and Conditions</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" />{" "}
                <span>I agree to the Privacy Policy</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" />{" "}
                <span>
                  I consent to the processing of my personal data for account
                  management and verification purposes
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" />{" "}
                <span>
                  I would like to receive marketing communications (optional)
                </span>
              </label>

              <div className="mt-3 p-3 rounded border border-gray-100 text-xs text-gray-500">
                <div className="font-medium">Data Protection Commitment</div>
                <div>
                  Your personal information is protected under Nigerian Data
                  Protection Regulation (NDPR) and international data protection
                  standards. We implement robust security measures to safeguard
                  your data and never share it with unauthorized third parties.
                </div>
              </div>
            </div>
          </section>

          <div className="text-center mt-6">
            <button
              onClick={handleComplete}
              disabled={submitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
            >
              {submitting ? "Completing..." : "Complete Onboarding"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
