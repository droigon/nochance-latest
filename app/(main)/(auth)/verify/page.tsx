"use client";

import { useState, useRef, useEffect } from "react";
import { API_ROUTES } from "@/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function VerifyPage() {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Auto-focus next input
    if (value && index < 5) {
      const nextIndex = index + 1;
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const prevIndex = index - 1;
      inputRefs.current[prevIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = codes.join("");
    if (fullCode.length !== 6) return;

    setLoading(true);

    try {
      const email = localStorage.getItem("pendingEmail");

      const res = await fetch(`${API_ROUTES.verify}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("pendingEmail");
        alert("Account verified successfully!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Verification failed");
      }
    } catch (error) {
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Image
                src="/assets/logo/Nochance-logo.png"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
          </div>
        </Link>

        {/* Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Verify your email
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            We&apos;ve sent a 6-digit code to your email.
            <br />
            Please enter it below to continue.
          </p>
        </div>

        {/* Secure Code Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Secure code
          </label>

          {/* Code Input Boxes */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {/* First 3 digits */}
            {codes.slice(0, 3).map((code, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-black text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors bg-white"
              />
            ))}

            {/* Dash separator */}
            <div className="w-4 h-0.5 bg-gray-400 mx-2"></div>

            {/* Last 3 digits */}
            {codes.slice(3, 6).map((code, index) => (
              <input
                key={index + 3}
                ref={(el) => {
                  inputRefs.current[index + 3] = el;
                }}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleInputChange(index + 3, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index + 3, e)}
                className="w-12 h-14 text-center text-black text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors bg-white"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading || codes.some((code) => !code)}
            className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
              loading || codes.some((code) => !code)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 active:bg-purple-800"
            }`}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </div>

        {/* Return to Login Link */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to login
          </Link>
        </div>
      </div>
    </div>
  );
}
