"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";
import { AuthService } from "@/services/auth/auth";
import { useRouter } from "next/navigation";
import { Marketing } from "@/components/dashboard/components/auth/Marketing";

export default function VendorSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agree) return;

    setLoading(true);
    try {
      const res = await AuthService.signup({
        email,
        password,
        UserRole: "VENDOR",
      });
      if (!res) throw new Error("No response from auth service");
      if (res.success === false) {
        return;
      }
      router.push(`/verify?email=${email}`);
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
          <Link href="/" className="text-gray-600 hover:underline">
            &larr; Back to website
          </Link>
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#8B5CF6] font-semibold hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="mt-6 text-2xl text-center font-bold text-gray-900">
            Sign up your business.
          </h1>
          <p className="text-gray-500 text-center text-sm mb-6">
            All we need is a few business details, then you'll be set up!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Business email address
              </label>
              <Input
                type="email"
                placeholder="for example 'you@companyname.com'"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Create password
              </label>
              <Input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ul className="mt-2 grid grid-cols-2 text-xs text-gray-500 gap-x-4 list-disc list-inside">
                <li>Lowercase characters</li>
                <li>Uppercase characters</li>
                <li>Numbers</li>
                <li>10 characters minimum</li>
              </ul>
            </div>

            {/* Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-purple-600 hover:underline">
                  Terms of service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-purple-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={loading || !agree}
            >
              {loading ? "Signing up..." : "Sign up for free"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
