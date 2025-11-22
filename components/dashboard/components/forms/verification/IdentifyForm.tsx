"use client";
import { Input, PrimaryButton } from "@/components/ui";
import React, { useEffect, useRef, useState } from "react";

type LocalDraft = {
  nin?: string;
  ninVerified?: boolean;
  bvn?: string;
  bvnVerified?: boolean;
};

type VerifyResult = { success: boolean; data?: any };

type Props = {
  initial?: LocalDraft;
  onVerifyNin?: (nin: string) => Promise<VerifyResult>;
  onVerifyBvn?: (bvn: string) => Promise<VerifyResult>;
  onSaveDraft?: (values: LocalDraft) => Promise<any> | void;
  onNext?: (values: LocalDraft, file?: File | null) => Promise<any> | void;
};

const DRAFT_KEY = "verification:identity:draft";
const ID_LEN = 11;

export default function IdentifyForm({
  initial,
  onVerifyNin,
  onVerifyBvn,
  onSaveDraft,
  onNext,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  // identity fields
  const [nin, setNin] = useState(initial?.nin ?? "");
  const [ninVerified, setNinVerified] = useState(Boolean(initial?.ninVerified));

  const [bvn, setBvn] = useState(initial?.bvn ?? "");
  const [bvnVerified, setBvnVerified] = useState(Boolean(initial?.bvnVerified));

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [verifyingNin, setVerifyingNin] = useState(false);
  const [verifyingBvn, setVerifyingBvn] = useState(false);

  const [ninData, setNinData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // local stepper: 0 = NIN, 1 = BVN
  const [stepIndex, setStepIndex] = useState(0);
  const stepsCount = 2;

  // load draft from localStorage (merge with initial if provided)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as LocalDraft;
        setNin((prev) => prev || d.nin || initial?.nin || "");
        setNinVerified(
          (prev) =>
            prev || Boolean(d.ninVerified) || Boolean(initial?.ninVerified)
        );
        setBvn((prev) => prev || d.bvn || initial?.bvn || "");
        setBvnVerified(
          (prev) =>
            prev || Boolean(d.bvnVerified) || Boolean(initial?.bvnVerified)
        );
      } else if (initial) {
        setNin(initial.nin ?? "");
        setNinVerified(Boolean(initial.ninVerified));
        setBvn(initial.bvn ?? "");
        setBvnVerified(Boolean(initial.bvnVerified));
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // autosave local draft (no file)
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const payload: LocalDraft = {
          nin,
          ninVerified,
          bvn,
          bvnVerified,
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
      } catch {}
    }, 500);
    return () => window.clearTimeout(id);
  }, [nin, ninVerified, bvn, bvnVerified]);

  const remainingNin = Math.max(0, ID_LEN - nin.replace(/\D/g, "").length);
  const remainingBvn = Math.max(0, ID_LEN - bvn.replace(/\D/g, "").length);

  const pickFile = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null);

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
  };

  const saveDraftLocal = async () => {
    const payload: LocalDraft = {
      nin,
      ninVerified,
      bvn,
      bvnVerified,
    };
    await Promise.resolve(onSaveDraft?.(payload));
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch {}
    return payload;
  };

  const handleVerifyNin = async () => {
    setError(null);
    if (!nin || nin.replace(/\D/g, "").length < 6) {
      setError("Enter a valid NIN to verify.");
      return;
    }
    if (!onVerifyNin) {
      setError("Verification handler not available");
      return;
    }
    setVerifyingNin(true);
    try {
      const res = await onVerifyNin(nin.trim());
      if (res?.success) {
        setNinVerified(true);
        if (res.data) setNinData(res.data);
      } else {
        setNinVerified(false);
        setError("NIN verification failed");
      }
    } catch (e: any) {
      console.error("NIN verify error:", e);
      setNinVerified(false);
      setError(e?.message ?? "NIN verification failed");
    } finally {
      setVerifyingNin(false);
    }
  };

  const handleVerifyBvn = async () => {
    setError(null);
    if (!bvn || bvn.replace(/\D/g, "").length !== 11) {
      setError("Enter a valid BVN to verify.");
      return;
    }
    if (!onVerifyBvn) {
      setError("Verification handler not available");
      return;
    }
    setVerifyingBvn(true);
    try {
      const res = await onVerifyBvn(bvn.trim());
      if (res?.success) {
        setBvnVerified(true);
      } else {
        setBvnVerified(false);
        setError("BVN verification failed");
      }
    } catch (e: any) {
      console.error("BVN verify error:", e);
      setBvnVerified(false);
      setError(e?.message ?? "BVN verification failed");
    } finally {
      setVerifyingBvn(false);
    }
  };

  const goNext = async () => {
    if (stepIndex < stepsCount - 1) {
      setStepIndex((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // last step -> call onNext (parent performs submit & navigation)
    setLoading(true);
    setError(null);
    try {
      const payload = await saveDraftLocal();
      await Promise.resolve(onNext?.(payload, file));
      clearDraft();
    } catch (e: any) {
      console.error("Identity submit error:", e);
      setError(e?.message ?? "Submission failed");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const goPrev = () => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // global events from layout (unchanged behavior)
  useEffect(() => {
    const onSave = () => void saveDraftLocal();
    const onContinue = () =>
      void (stepIndex < stepsCount - 1
        ? (setStepIndex((s) => s + 1),
          window.scrollTo({ top: 0, behavior: "smooth" }))
        : goNext());
    const onPrevious = () => {
      if (stepIndex > 0) setStepIndex((s) => s - 1);
    };

    window.addEventListener("verification:save", onSave);
    window.addEventListener("verification:continue", onContinue);
    window.addEventListener("verification:previous", onPrevious);

    return () => {
      window.removeEventListener("verification:save", onSave);
      window.removeEventListener("verification:continue", onContinue);
      window.removeEventListener("verification:previous", onPrevious);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, nin, ninVerified, bvn, bvnVerified, file]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <div className="flex items-start justify-center  px-4">
        <div className="w-full max-w-2xl">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              void goNext();
            }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Identity Verification (NIN / BVN)
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Provide your NIN and/or BVN and upload ID document if available.
              </p>
            </div>

            <div className="space-y-6 mb-6 max-w-xl mx-auto">
              {stepIndex === 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National Identification Number (NIN)
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={nin}
                    onChange={(e) =>
                      setNin(e.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="Enter your NIN"
                    className="w-full text-gray-700"
                  />

                  <div className="text-xs text-gray-400 mt-2">
                    {remainingNin} digits remaining
                  </div>
                  {ninVerified && (
                    <div className="inline-block mt-3 text-sm text-green-700 bg-green-100 px-3 py-1 rounded">
                      NIN verified successfully!
                    </div>
                  )}
                  <div className="flex justify-start mt-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleVerifyNin}
                      disabled={verifyingNin}
                      variant="solidRounded"
                      size="quarter"
                    >
                      {verifyingNin ? "Verifying..." : "Verify NIN"}
                    </PrimaryButton>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Document (optional)
                    </label>
                    <div
                      onClick={pickFile}
                      className="flex items-center justify-between w-full rounded-lg border border-gray-200 bg-white px-4 py-4 cursor-pointer hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-purple-600">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
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
                        {file ? file.name : "No file chosen"}
                      </div>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf,image/*"
                      className="hidden"
                      onChange={onFile}
                    />
                  </div>
                </div>
              )}

              {stepIndex === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Verification Number (BVN)
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={bvn}
                    onChange={(e) =>
                      setBvn(e.target.value.replace(/[^\d]/g, ""))
                    }
                    placeholder="Enter your BVN"
                    className="w-full text-gray-700"
                  />

                  <div className="text-xs text-gray-400 mt-2">
                    {remainingBvn} digits remaining
                  </div>
                  {bvnVerified && (
                    <div className="inline-block mt-3 text-sm text-green-700 bg-green-100 px-3 py-1 rounded">
                      BVN verified successfully!
                    </div>
                  )}

                  <div className="mt-3 rounded-lg bg-purple-50 border border-purple-100 p-4 text-sm text-purple-800">
                    <div className="font-medium mb-1">What is BVN?</div>
                    <div>
                      Your BVN is a unique 11-digit number that identifies you
                      across all Nigerian banks. You can get it by dialing
                      *565*0# from your registered phone number.
                    </div>
                  </div>

                  <div className="flex justify-start mt-4">
                    <PrimaryButton
                      type="button"
                      onClick={handleVerifyBvn}
                      disabled={verifyingBvn}
                      variant="solidRounded"
                      size="quarter"
                    >
                      {verifyingBvn ? "Verifying..." : "Verify BVN"}
                    </PrimaryButton>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 mb-6 max-w-xl mx-auto p-2 border rounded">
              <div className="p-2 rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.98486 0.834961C9.31419 0.811402 10.3097 1.3704 11.1919 1.86621L11.2202 1.88184C12.1285 2.3922 12.9294 2.83496 14.0054 2.83496C14.242 2.83505 14.4462 3.0008 14.4946 3.23242C15.1687 6.4558 14.8071 9.13617 13.6343 11.1748C12.4593 13.2169 10.5038 14.5556 8.11084 15.1523C8.03558 15.1711 7.95706 15.1721 7.88135 15.1553C5.6452 14.656 3.68786 13.3603 2.47021 11.3232C1.25278 9.28631 0.802436 6.55629 1.48389 3.23438C1.53415 2.98935 1.75779 2.81913 2.00732 2.83594C2.9439 2.8996 3.71573 2.48429 4.65869 1.95508C4.67544 1.94568 4.69262 1.93622 4.70947 1.92676C5.60731 1.4226 6.65173 0.836441 7.98486 0.834961ZM11.0923 4.82227C10.8094 4.58656 10.3885 4.62438 10.1528 4.90723L7.2876 8.34668L6.13721 7.19629C5.87686 6.93594 5.4542 6.93594 5.19385 7.19629C4.93373 7.45662 4.93368 7.87838 5.19385 8.13867L6.86084 9.80566C6.99317 9.93788 7.17494 10.0084 7.36182 10C7.54893 9.99151 7.72433 9.90464 7.84424 9.76074L11.1772 5.76074C11.4129 5.47798 11.3749 5.05801 11.0923 4.82227Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-700 ">
                <div className="font-medium">Privacy & Security</div>
                <div className="text-gray-500">
                  Your NIN/BVN is used only for identity verification and is
                  stored securely according to CBN guidelines and Nigerian data
                  protection laws.
                </div>
              </div>
            </div>

            {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

            <div className="flex justify-center gap-4">
              {stepIndex > 0 && (
                <PrimaryButton
                  type="button"
                  onClick={goPrev}
                  variant="lightRounded"
                  size="half"
                >
                  Previous
                </PrimaryButton>
              )}
              <PrimaryButton
                type="submit"
                disabled={
                  loading ||
                  (stepIndex === 0 && !ninVerified) ||
                  (stepIndex === 1 && !bvnVerified)
                }
                variant="solidRounded"
                size={stepIndex > 0 ? "half" : "full"}
              >
                {loading
                  ? "Submitting..."
                  : stepIndex < stepsCount - 1
                  ? "Next"
                  : "Submit"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
