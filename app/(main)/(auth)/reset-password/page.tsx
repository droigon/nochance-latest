"use client";

import { useState } from "react";
import { Marketing } from "@/components/dashboard/components/auth/Marketing";
import { ResetPasswordDTO } from "@/dtos/auth.dto";
import { AuthService } from "@/services/auth/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const email = localStorage.getItem("resetEmail");
    if (!email) {
      alert("No email found. Please restart the flow.");
      router.push("/forgot-password");
      return;
    }

    const token = localStorage.getItem("resetToken");
    if (!token) {
      alert("No token found. Please restart the flow.");
      router.push("/forgot-password");
      return;
    }
    const data: ResetPasswordDTO = { email, token, newPassword: password };
    try {
      const res = await AuthService.resetPassword(data);
      if (res.success) {
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("resetToken");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const passwordValid =
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 10;

  return (
    <div className="min-h-screen flex bg-[#F7F6FB]">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/4 px-6 lg:px-16 bg-white">
        <div className="max-w-md w-full p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center text-gray-900">
            Create a new password
          </h1>
          <p className="text-gray-500 text-center mt-2 text-sm">
            Your new password must be different from your previous password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Password rules */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <span>● Lowercase characters</span>
              <span>● Uppercase characters</span>
              <span>● Numbers</span>
              <span>● 10 characters minimum</span>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={!passwordValid || loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>

        {/* Right Side Shapes */}
      </div>
      <Marketing />
    </div>
  );
}
