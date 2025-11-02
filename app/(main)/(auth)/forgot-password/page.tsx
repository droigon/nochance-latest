"use client";
import { useState } from "react";
import { AuthService } from "@/services/auth/auth";
import { Marketing } from "@/components/dashboard/components/auth/Marketing";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";
import { ForgotPasswordDTO } from "@/dtos/auth.dto";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ForgotPasswordDTO>({ email: "" });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthService.forgotPassword({ email: form.email });
      if (res.success) {
        localStorage.setItem("resetEmail", form.email);
        router.push("/password-token-verification");
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
      <Marketing />

      {/* Right Panel */}
      <div className="w-full md:w-3/4 flex flex-col px-12 py-16">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" passHref className="text-gray-600 hover:underline">
            &larr; Back to website
          </Link>

          <span className="text-sm text-gray-600">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-[#8B5CF6] font-semibold hover:underline"
            >
              Log in
            </a>
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-8 text-center text-gray-900">
          Reset your password
        </h1>
        <div className="max-w-md mx-auto w-full">
          {message ? (
            <div className="bg-green-100 text-green-800 p-4 rounded mb-6">
              {message}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
