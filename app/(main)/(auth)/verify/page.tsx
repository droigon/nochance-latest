"use client";

import { useState } from "react";
import { Input } from "@/components/dashboard/components/ui/Input";
import { Button } from "@/components/dashboard/components/ui/Button";
import { Card } from "@/components/dashboard/components/ui/Card";
import { API_ROUTES } from "@/services";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = localStorage.getItem("pendingEmail");

    const res = await fetch(`${API_ROUTES.verify}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      localStorage.removeItem("pendingEmail");
      alert("Account verified successfully!");
      window.location.href = "/login";
    } else {
      alert(data.message || "Verification failed");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-2">Verify Account</h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter the 6-digit code sent to your email
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <Input
          type="text"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </Card>
  );
}
