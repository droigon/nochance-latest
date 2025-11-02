"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/dashboard/components/ui/Button";

export default function UserSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role: "user" }),
    });

    if (res.ok) {
      router.push("/login");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-80 space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold">User Signup</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}
