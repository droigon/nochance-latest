"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";
import Link from "next/link";
import { AuthService } from "@/services/auth/auth";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContexts";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await AuthService.login({
        email: form.email,
        password: form.password,
      });
      if (!res) throw new Error("No response from auth service");
      if (res.success === false) {
        toast.error(res.message || "Login failed");
        return;
      }

      const payload = res.data ?? res;
      const user = payload.user ?? payload;
      const business = payload.business ?? null;
      const token = payload.token ?? null;

      // store token if backend returns it (not required if server sets HttpOnly cookie)
      if (token) {
        try {
          localStorage.setItem("token", token);
        } catch {}
      }
      // update context + persist safe profile
      setUser(user ?? null, business ?? null);

      // set a readable user cookie in dev only (middleware quick check). Remove in prod.
      try {
        if (user) {
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(user)
          )}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
      } catch {}

      // redirect by role
      if (user?.userRole === "ADMIN") router.push("/dashboard/admin");
      else if (user?.userRole === "VENDOR") router.push("/dashboard/vendor");
      else router.push("/dashboard/user");
    } catch (err: any) {
      console.error("Login error", err);
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side (form) → 3/4 */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/4 px-6 lg:px-16 bg-white">
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

          <h1 className="text-3xl text-black font-bold text-center mb-2">
            Welcome back!
          </h1>
          <p className="text-center text-black mb-6">
            Don’t have an account yet?{" "}
            <Link href="/signup" className="text-purple-600 font-medium">
              Sign up now
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <div className="flex justify-between items-center mt-2">
                <label className="flex text-gray-700 items-center text-sm">
                  <input type="checkbox" className="mr-2" /> Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-600"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </div>
      </div>

      {/* Right side (marketing panel) → 1/4 */}
      <div className="hidden md:flex w-1/4 bg-gradient-to-br from-purple-500 to-indigo-600 text-white items-center justify-center p-10">
        <div className="max-w-xs text-center">
          <div className="text-5xl mb-4">✨</div>
          <h2 className="text-xl font-bold mb-4">
            Start turning your ideas into reality.
          </h2>
          <p className="mb-6 text-gray-100 text-sm">
            Create a free account and get full access to all features for
            30-days. No credit card needed. Trusted by over 4,000 professionals.
          </p>

          <div className="flex justify-center items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: [
                    "#F9E3B1",
                    "#EBC5F7",
                    "#B3D4FF",
                    "#C9E8C8",
                    "#D1B6FF",
                  ][i],
                }}
              ></div>
            ))}
          </div>
          <p className="mt-3 text-yellow-300 font-medium text-sm">
            ⭐ 5.0 from 2000+ reviews
          </p>
        </div>
      </div>
    </div>
  );
}
