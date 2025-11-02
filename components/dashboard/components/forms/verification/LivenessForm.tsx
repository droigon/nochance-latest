"use client";

import React, { useState } from "react";

export default function LivenessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStart() {
    setError(null);
    setLoading(true);

    try {
      // ✅ 1. Ask backend for dynamic Dojah config (with logged-in user ID)
      const res = await fetch("/api/dojah-config", { credentials: "include" });
      if (!res.ok) throw new Error("Please log in first or try again later.");

      const cfg = await res.json();

      // ✅ 2. If backend gives a redirect/launch URL (some flows do)
      if (cfg.launchUrl) {
        window.open(cfg.launchUrl, "_blank", "noopener");
        setLoading(false);
        return;
      }

      // ✅ 3. Load Dojah SDK dynamically
      if (!document.querySelector(`script[src="${cfg.scriptUrl}"]`)) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = cfg.scriptUrl;
          s.async = true;
          s.onload = () => resolve();
          s.onerror = () =>
            reject(new Error("Failed to load verification SDK"));
          document.body.appendChild(s);
        });
      }

      // ✅ 4. Initialize Dojah Connect widget
      const win: any = window;
      const Connect = win.Connect;
      if (!Connect) throw new Error("Dojah SDK not available after load");

      const instance = new Connect({
        ...cfg.options,
        onSuccess: (res: any) => {
          console.log("✅ Verification Success:", res);
          alert("✅ Verification complete!");
        },
        onError: (err: any) => {
          console.error("❌ Verification Error:", err);
          alert("Verification failed. Please try again.");
        },
        onClose: () => console.log("Widget closed"),
      });

      instance.setup();
      instance.open();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to start verification");
    } finally {
      setLoading(false);
    }
  }

  // ✅ 5. UI stays *exactly* as you provided
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <div className="text-sm text-gray-400 mb-2">Step 5 of 5</div>
          <h1 className="text-2xl font-semibold mb-2">Liveness Verification</h1>
          <p className="text-sm text-gray-500 mb-8">
            We need to verify that you're a real person. This helps protect your
            account from fraud.
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="w-28 h-28 rounded-full border-2 border-purple-100 flex items-center justify-center mx-auto">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center text-2xl">
                📷
              </div>
            </div>
          </div>

          <div className="text-left max-w-lg mx-auto mb-6">
            <h3 className="font-medium mb-2">Before we start:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Make sure you're in a well-lit area</li>
              <li>Remove hats, sunglasses, or masks</li>
              <li>Look directly at the camera</li>
              <li>Follow the on-screen instructions</li>
            </ul>
          </div>

          <div className="bg-gray-50 border rounded p-4 text-left text-sm text-gray-600 max-w-lg mx-auto mb-6">
            <strong className="block text-sm mb-1">Privacy & Security</strong>
            Your video and images are encrypted and stored securely. We use
            industry-standard security measures to protect your information.
          </div>

          {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

          <div>
            <button
              onClick={handleStart}
              disabled={loading}
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-full shadow-sm"
            >
              {loading ? "Starting…" : "Start Verification"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
