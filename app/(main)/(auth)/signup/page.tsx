"use client";

import Link from "next/link";
import { Marketing } from "@/components/dashboard/components/auth/Marketing";

export default function SignupRolePage() {
  return (
    <div className="min-h-screen flex bg-[#F7F6FB]">
      {/* Left Side (marketing) → 1/4 */}
      <Marketing />

      {/* Right Side (form) → 3/4 */}
      <div className="w-full md:w-3/4 flex flex-col px-12 py-16">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="text-gray-500 hover:underline">
            &larr; Back to website
          </Link>
          <span className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#8B5CF6] font-semibold hover:underline"
            >
              Log in
            </Link>
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-8 text-center">
          How would you use Nochance?
        </h1>
        <div className="flex flex-col gap-6">
          <Link href="/signup/user">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 hover:shadow-lg transition cursor-pointer">
              <span className="text-5xl">🧑‍💼</span>
              <div>
                {" "}
                <h2 className="font-semibold text-lg mb-1">
                  I'm an individual
                </h2>
                <p className="text-gray-600 text-sm">
                  Verify businesses, share my experience, and help keep online
                  commerce safe for everyone.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/signup/business">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6 hover:shadow-lg transition cursor-pointer">
              <span className="text-5xl">🏪</span>
              <div>
                <h2 className="font-semibold text-lg mb-1">I'm a business</h2>

                <p className="text-gray-600 text-sm">
                  Get verified, earn customer trust, and grow your sales with
                  compliance badges and real feedback.
                </p>
              </div>
            </div>
          </Link>
          {/* Individual Card */}
        </div>
      </div>
    </div>
  );
}
