"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { AuthService } from "@/services/auth/auth";
import { Marketing } from "@/components/dashboard/components/auth/Marketing";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";

export default function VerifyPasswordTokenPage() {
  const [codes, setCodes] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(value: string, index: number) {
    const newCodes = [...codes];
    newCodes[index] = value.slice(-1); // only keep last typed char
    setCodes(newCodes);

    // Move to next box if value entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      alert("No email found. Please restart the flow.");
      router.push("/forgot-password");
      return;
    }

    const token = codes.join("");
    if (token.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthService.resetPasswordVerify({ email, token });
      if (res.success) {
        localStorage.setItem("resetToken", token);
        router.push("/reset-password");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F7F6FB]">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/4 px-6 lg:px-16 bg-white">
        <form
          onSubmit={handleVerify}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Verify your code
          </h2>
          <p className="text-gray-600 text-center mb-6">
            We've sent a verification code to your email.
          </p>
          <p className="text-gray-600 text-center mb-6">
            Please enter it below to reset your password.
          </p>

          <div className="flex justify-between mb-6">
            {codes.map((digit, idx) => (
              <Input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, idx)}
                ref={(el: HTMLInputElement | null) => {
                  inputsRef.current[idx] = el;
                }}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={codes.some((code) => code === "") || loading}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={() => alert("Resend code (implement API call)")}
              className="text-purple-600 font-semibold hover:underline"
            >
              Resend
            </button>
          </p>
        </form>
      </div>

      <Marketing />

      {/* Right Panel */}
    </div>
  );
}
