"use client";
import React, { useEffect, useRef, useState } from "react";
import { BANKS } from "@/utils/constants/bank";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type BankItem = { code: string; name: string };

type VerifiedInfo = {
  name: string;
  bank: string;
  account: string;
} | null;

type Draft = {
  bank?: string; // bank code
  account?: string;
  verifiedInfo?: VerifiedInfo;
};

type Props = {
  initial?: Draft;
  onVerifyAccount?: (
    bankCode: string,
    accountNumber: string
  ) => Promise<{ success: boolean; data?: any }>;
  onSaveDraft?: (values: Draft) => Promise<any> | void;
  onNext?: (values: Draft) => Promise<any> | void;
};

const DRAFT_KEY = "verification:bank:draft";
const ACCOUNT_LEN = 10;

export default function BankForm({
  initial,
  onVerifyAccount,
  onSaveDraft,
  onNext,
}: Props) {
  // helpers
  const findCodeByName = (name?: string | null) =>
    !name
      ? undefined
      : BANKS.find(
          (b: BankItem) =>
            b.code === name || b.name.toLowerCase() === name.toLowerCase()
        )?.code;

  const findNameByCode = (code?: string | null) =>
    !code ? undefined : BANKS.find((b: BankItem) => b.code === code)?.name;

  // initialize bank as a code if possible (accepts code or name in initial)
  const initialBankCode =
    findCodeByName(initial?.bank as string | undefined) ?? initial?.bank ?? "";

  const [bank, setBank] = useState<string>(initialBankCode);
  const [account, setAccount] = useState<string>(initial?.account ?? "");
  const [remaining, setRemaining] = useState<number>(ACCOUNT_LEN);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifiedInfo, setVerifiedInfo] = useState<VerifiedInfo>(
    initial?.verifiedInfo ?? null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // request token to ignore stale responses
  const reqIdRef = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as Draft;
        // accept saved bank as code or name
        const code = findCodeByName(d.bank) ?? d.bank ?? initialBankCode;
        setBank((prev) => prev || code || "");
        setAccount((prev) => prev || d.account || initial?.account || "");
        setVerifiedInfo(
          (prev) => prev || d.verifiedInfo || initial?.verifiedInfo || null
        );
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ bank, account, verifiedInfo })
        );
      } catch {}
    }, 400);
    return () => window.clearTimeout(id);
  }, [bank, account, verifiedInfo]);

  useEffect(() => {
    const digits = account.replace(/\D/g, "").length;
    setRemaining(Math.max(0, ACCOUNT_LEN - digits));
    if (verifiedInfo && verifiedInfo.account !== account.trim())
      setVerifiedInfo(null);

    if (digits === ACCOUNT_LEN) {
      const t = window.setTimeout(() => {
        void verifyAccount(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveDraftLocal = async () => {
    const payload: Draft = { bank, account, verifiedInfo };
    await Promise.resolve(onSaveDraft?.(payload));
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
    } catch {}
    return payload;
  };

  const verifyAccount = async (silent = false) => {
    setError(null);
    setVerifyError(null);

    const digits = account.replace(/\D/g, "").length;
    if (!account || digits < 6) {
      if (!silent) setError("Enter a valid account number to verify.");
      return;
    }
    if (!onVerifyAccount) {
      if (!silent) setError("Verification handler not available");
      return;
    }

    const thisReq = ++reqIdRef.current;
    setVerifying(true);

    try {
      console.log("Verifying account", { bank, account });
      const res = await onVerifyAccount(bank, account.trim());

      // ignore stale responses
      if (thisReq !== reqIdRef.current) return;

      if (!res.success) {
        if (!silent) setVerifyError("Account verification failed");
        setVerifiedInfo(null);
        return;
      }

      const data = res.data ?? {};
      // prefer explicit fields returned by API, fallback to known lookup
      const accountName =
        data.name ?? data.accountName ?? data.account_name ?? "Account Holder";
      const accountNumber =
        data.account ?? data.account_number ?? account.trim();

      // If API returns a bank code use it, else try to map bankName to code
      const returnedBankCode =
        data.bankCode ??
        findCodeByName(data.bankName) ??
        findCodeByName(data.bank) ??
        bank;

      const bankDisplayName =
        findNameByCode(returnedBankCode) ??
        data.bankName ??
        data.bank ??
        "Unknown Bank";

      // persist bank as code (if available)
      if (returnedBankCode) setBank(returnedBankCode);

      const info: VerifiedInfo = {
        name: accountName,
        bank: bankDisplayName,
        account: accountNumber,
      };

      setVerifiedInfo(info);
    } catch (err: any) {
      console.error(err);
      if (!silent) setVerifyError("Account verification failed");
      setVerifiedInfo(null);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (!account.trim()) {
      setError("Account number is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = await saveDraftLocal();
      console.log("Draft saved:", payload);
      await Promise.resolve(onNext?.(payload));
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
    } catch (e: any) {
      setError(e?.message ?? "Failed to save bank details");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white rounded-xl shadow py-10 px-8 max-w-xl mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit();
      }}
    >
      <div className="text-center mb-6">
        <div className="text-xs text-gray-400 mb-2">Step 4 of 5</div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Bank Account Details
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Please provide your bank account information.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Select your bank
          </label>

          <select
            value={bank}
            onChange={(e) => {
              setBank(e.target.value);
              if (verifiedInfo) setVerifiedInfo(null);
            }}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3"
          >
            <option value="">-- Select Bank --</option>
            {BANKS.map((b) => (
              <option key={b.id} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">
            Account Number *
          </label>
          <Input
            type="text"
            inputMode="numeric"
            value={account}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "");
              setAccount(v);
            }}
            placeholder="Enter account number"
            className="w-full rounded-lg border border-gray-200 px-4 py-3"
          />
          <div className="text-xs text-gray-400 mt-2">
            {remaining} digits remaining
          </div>
        </div>

        {verifying && (
          <p className="text-sm text-gray-500 mt-2">Verifying account...</p>
        )}
        {verifyError && (
          <p className="text-sm text-red-500 mt-2">{verifyError}</p>
        )}

        {verifiedInfo && (
          <div className="rounded-lg bg-green-50 border border-green-100 p-4 text-sm text-green-800">
            <div className="inline-block mb-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded">
              Account Verified
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>Account Name:</div>
              <div className="font-medium text-right">{verifiedInfo.name}</div>

              <div>Bank:</div>
              <div className="font-medium text-right">{verifiedInfo.bank}</div>

              <div>Account Number</div>
              <div className="font-medium text-right">
                {verifiedInfo.account}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-lg border border-gray-200 bg-white text-sm">
          <div className="flex items-start gap-3">
            <div className="pt-1">
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
            <div>
              <div className="font-medium">Privacy & Security</div>
              <div className="text-gray-500">
                Your bank details are encrypted and stored securely. We use
                industry‑standard security measures to protect your financial
                information.
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => void verifyAccount(false)}
            disabled={verifying}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
          >
            {verifying ? "Verifying..." : "Verify Account"}
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
      </div>
    </form>
  );
}
