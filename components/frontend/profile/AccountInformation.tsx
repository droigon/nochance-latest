"use client";

import {
  Building2,
  CreditCard,
  User,
  ShieldCheck,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { BANKS } from "@/utils/constants/bank";

interface AccountInformationProps {
  bankCode?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  verifiedName?: string | null;
}

const getBankName = (bankCode?: string | null) => {
  if (!bankCode) return "Bank";

  const bank = BANKS.find((b) => b.code === bankCode);
  return bank?.name || `Bank (${bankCode})`;
};

export default function AccountInformation({
  bankCode,
  accountNumber,
  accountName,
  verifiedName,
}: AccountInformationProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const bankName = getBankName(bankCode);
  const displayName = verifiedName || accountName;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Don't render if no bank information is available
  if (!bankCode && !accountNumber && !accountName && !verifiedName) {
    return null;
  }

  return (
    <section className="bg-white p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          Financial Confidence
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Bank Name */}
        {bankCode && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <p className="text-xs uppercase text-indigo-600 font-semibold">
                  Bank
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(bankCode, "bankCode")}
                className="p-1.5 hover:bg-indigo-200 rounded transition"
                title="Copy bank code"
              >
                {copiedField === "bankCode" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900">{bankName}</p>
            {bankCode && (
              <p className="text-xs text-gray-500 mt-1">Code: {bankCode}</p>
            )}
          </div>
        )}

        {/* Account Number */}
        {accountNumber && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <p className="text-xs uppercase text-gray-600 font-semibold">
                  Account Number
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(accountNumber, "accountNumber")}
                className="p-1.5 hover:bg-gray-200 rounded transition"
                title="Copy account number"
              >
                {copiedField === "accountNumber" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 font-mono break-all">
              {accountNumber}
            </p>
            <p className="text-xs text-gray-500 mt-1">Verified Account</p>
          </div>
        )}

        {/* Account Name */}
        {displayName && (
          <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                <p className="text-xs uppercase text-green-600 font-semibold">
                  Account Name
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(displayName, "accountName")}
                className="p-1.5 hover:bg-green-200 rounded transition"
                title="Copy account name"
              >
                {copiedField === "accountName" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-green-600" />
                )}
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 break-words">
              {displayName}
            </p>
            {verifiedName && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </p>
            )}
          </div>
        )}
      </div>

      {/* Verification Note */}
      {(bankCode || accountNumber || displayName) && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> Bank account information is verified and
            secured. Click the copy icon to copy account details to your
            clipboard.
          </p>
        </div>
      )}
    </section>
  );
}
