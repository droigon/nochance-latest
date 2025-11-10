"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import { PrimaryButton } from "@/components/ui";
import { Input } from "@/components/dashboard/components/ui";
import { AuthService } from "@/services/auth/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [step, setStep] = useState<"email" | "verify" | "password">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await AuthService.sendCode({ email });
      if (!res.success) throw new Error(res.message || "Failed to send OTP");
      setStep("verify");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const token = otp.join("");
      const res = await AuthService.verifyCode({ email, token });
      if (!res.success) throw new Error(res.message || "Invalid OTP");
      setStep("password");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) return alert("Passwords do not match!");
    setLoading(true);
    try {
      const res = await AuthService.signup({
        email,
        password,
        token: otp.join(""),
        UserRole: "USER",
      });
      if (!res.success) throw new Error(res.message || "Signup failed");
      alert("Signup successful!");
      // Redirect or perform any other actions after successful signup

      router.push("/login");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const numericValue = value.replace(/\D/, "");
    const newOtp = [...otp];
    newOtp[index] = numericValue;
    setOtp(newOtp);

    // Move focus automatically
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center  bg-grey-98 text-center py-32">
        <div className="w-full max-w-lg">
          <h1 className="heading-3i text-grey-24 sm:text-4xl font-semibold mb-2">
            Search, Read Reviews & Verify
            <br /> Any Business in Nigeria
          </h1>

          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <label className="block text-grey-24 text-left">
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PrimaryButton
                  onClick={handleSendOtp}
                  disabled={loading || !email}
                  className="w-full"
                  variant="solidRounded"
                >
                  {loading ? "Sending..." : "Continue with email"}
                </PrimaryButton>

                <div className="mt-12">
                  <h2 className="text-xl heading-3 font-semibold mb-2">
                    Are you a business owner?
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Set up your business account on Nochance at no cost.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg">
                      Log in
                    </button>
                    <button className="border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium px-6 py-2 rounded-lg">
                      Sign up
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "verify" && (
              <>
                <motion.div
                  key="verify-step"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5 "
                >
                  <div className="space-y-1 text-center">
                    <p className="text-gray-600">Verification code sent to</p>
                    <div className="flex items-center justify-center space-x-2">
                      <p className="font-semibold text-gray-900">{email}</p>
                      <button className="text-purple-600 text-sm font-medium hover:text-purple-800 underline">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600 text-left">
                      Enter 6-digit verification code
                    </p>

                    <div className="flex justify-between gap-5 items-center">
                      {otp.map((digit, i) => (
                        <div key={i} className="relative">
                          <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, i)}
                            ref={(el) => {
                              inputRefs.current[i] = el;
                            }}
                            className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl transition-all duration-200
          ${
            digit
              ? "border-purple-500 bg-purple-50 text-purple-900"
              : "border-gray-300 bg-white text-gray-900"
          }
          focus:ring-4 focus:ring-purple-100 focus:border-purple-500 hover:border-purple-400 outline-none placeholder:text-gray-300`}
                            placeholder="0"
                          />

                          {/* Add a centered dash after the third input */}
                          {i === 2 && (
                            <div
                              className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-300 font-bold text-2xl select-none"
                              style={{
                                fontWeight: 900,
                                letterSpacing: "-1.2px",
                                lineHeight: "72px",
                                fontSize: 30,
                              }}
                            >
                              -
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <PrimaryButton
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.join("").length < 6}
                      className="w-full h-12 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-sm"
                      variant="solidRounded"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Verifying...</span>
                        </div>
                      ) : (
                        "Verify Code"
                      )}
                    </PrimaryButton>
                  </div>

                  <button
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-purple-600 text-sm font-semibold hover:text-purple-800 underline disabled:text-gray-400 disabled:no-underline transition-colors duration-200"
                  >
                    Resend verification code
                  </button>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      By creating an account, you agree to our{" "}
                      <a
                        href="/terms"
                        className="text-purple-600 hover:text-purple-800 underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        className="text-purple-600 hover:text-purple-800 underline"
                      >
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </motion.div>
              </>
            )}

            {step === "password" && (
              <motion.div
                key="password-step"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <label className="block text-grey-24 mb-1 text-left">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block text-grey-24 mb-1 text-left">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <PrimaryButton
                  onClick={handleSignup}
                  disabled={loading || !password || !confirmPassword}
                  className="w-full"
                  variant="solidRounded"
                >
                  {loading ? "Creating..." : "Create account"}
                </PrimaryButton>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}
