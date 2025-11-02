// ...existing code...
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const DRAFT_KEY = "verification:phone:draft";
const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function PhoneNumberForm() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>(() => {
    try {
      return localStorage.getItem("user:phone") || "+23481234567890";
    } catch {
      return "+23481234567890";
    }
  });

  const [step, setStep] = useState<"send" | "verify">("send");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  // code inputs
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [resendTimer, setResendTimer] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // load local draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.step) setStep(d.step);
        if (d.verified) setVerified(Boolean(d.verified));
        if (d.code)
          setCode((c) => (d.code.length === CODE_LENGTH ? d.code : c));
      }
    } catch {}
  }, []);

  // autosave light draft
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ step, verified, code })
        );
      } catch {}
    }, 300);
    return () => window.clearTimeout(id);
  }, [step, verified, code]);

  // resend countdown
  useEffect(() => {
    if (resendTimer <= 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = window.setInterval(() => {
      setResendTimer((s) => {
        if (s <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [resendTimer]);

  // focus management
  const focusInput = (idx: number) => inputsRef.current[idx]?.focus();

  const handleSendCode = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/verification/send-phone-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to send code");
      }
      setStep("verify");
      setResendTimer(RESEND_SECONDS);
      setCode(Array(CODE_LENGTH).fill(""));
      focusInput(0);
    } catch (err) {
      console.error(err);
      alert("Sending verification code failed");
    } finally {
      setSending(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    await handleSendCode();
  };

  const handleChangeDigit = (idx: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    setCode((c) => {
      const next = [...c];
      next[idx] = v;
      return next;
    });
    if (v && idx < CODE_LENGTH - 1) focusInput(idx + 1);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      focusInput(idx - 1);
      setCode((c) => {
        const next = [...c];
        next[idx - 1] = "";
        return next;
      });
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      focusInput(idx - 1);
    }
    if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1) {
      focusInput(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (!pasted) return;
    const chars = pasted.slice(0, CODE_LENGTH).split("");
    setCode((c) => {
      const next = [...c];
      for (let i = 0; i < chars.length; i++) next[i] = chars[i];
      return next;
    });
    const nextFocus = Math.min(chars.length, CODE_LENGTH - 1);
    focusInput(nextFocus);
    e.preventDefault();
  };

  const handleVerifyCode = async () => {
    const joined = code.join("");
    if (joined.length !== CODE_LENGTH) {
      alert("Enter the full verification code");
      return;
    }
    setVerifying(true);
    try {
      const res = await fetch("/api/verification/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: joined }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Verification failed");
      }
      setVerified(true);
      // clear draft
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      // navigate to next verification (adjust route if different)
      router.push("/dashboard/verifications/cac");
    } catch (err) {
      console.error(err);
      alert("Code verification failed");
      setVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleSave = async () => {
    try {
      await fetch("/api/verification/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "phone", data: { phone, verified } }),
      });
      alert("Progress saved");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // listen to layout events
  useEffect(() => {
    const onSave = () => void handleSave();
    const onContinue = () => {
      if (step === "send") return void handleSendCode();
      return void handleVerifyCode();
    };
    const onPrevious = () => {
      if (step === "verify") setStep("send");
      // otherwise let layout navigate back
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
  }, [step, code, phone, verified]);

  return (
    <div className="min-h-[60vh] flex items-start justify-center pt-12">
      {/* centered narrow card matching UI size */}
      <div className="bg-white rounded-xl shadow-md py-12 px-10 w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="text-xs text-gray-400 mb-2">Step 4 of 5</div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Verify your Phone Number
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            We'll send a 6-digit verification code to
          </p>
          <div className="mt-2 font-medium text-gray-800">{phone}</div>
        </div>

        {step === "send" && (
          <div className="flex flex-col items-center gap-5">
            <button
              onClick={handleSendCode}
              disabled={sending}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
            >
              {sending ? "Sending..." : "Send Verification Code"}
            </button>

            <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-600"
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
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        )}

        {step === "verify" && (
          <>
            <div className="flex items-center justify-center gap-4 mt-6 mb-3">
              {/* group first 3 digits, dash, then last 3 digits */}
              {code.map((d, i) => {
                const insertDashAfter = 2; // after index 2 (third digit)
                return (
                  <React.Fragment key={i}>
                    <input
                      ref={(el) => {
                        inputsRef.current[i] = el;
                      }}
                      value={d}
                      onChange={(e) =>
                        handleChangeDigit(i, e.target.value.slice(-1))
                      }
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      onPaste={handlePaste}
                      inputMode="numeric"
                      maxLength={1}
                      className={
                        "w-14 h-14 text-center text-3xl rounded-lg border-2 transition-colors " +
                        (d
                          ? "border-purple-400 bg-white text-purple-700"
                          : "border-gray-200 bg-white text-gray-700")
                      }
                      aria-label={`code-${i}`}
                    />
                    {i === insertDashAfter && (
                      <div className="w-8 text-center text-2xl text-gray-300 select-none">
                        -
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <div className="text-center mb-4 text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={resendTimer > 0}
                className="text-purple-600 hover:underline"
              >
                {resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Click to resend"}
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleVerifyCode}
                disabled={verifying}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
              >
                {verifying ? "Verifying..." : "Verify Phone Number"}
              </button>
            </div>

            <div className="text-center mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 text-gray-600"
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
              <span>Your data is secure and encrypted</span>
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center gap-6">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("verification:save"))
            }
            className="text-sm text-purple-600 hover:underline"
          >
            Save & finish later
          </button>
        </div>
      </div>
    </div>
  );
}
//
