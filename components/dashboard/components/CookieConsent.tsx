// components/CookieConsent.tsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "nochance_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch (e) {
      // ignore localStorage errors
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, ts: Date.now() })
      );
    } catch (e) {
      // ignore
    }
    setVisible(false);
  }

  function manage() {
    // optional: navigate to privacy or cookie settings
    window.location.href = "/privacy#cookies";
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-auto md:right-8 max-w-xl z-50">
      <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1">
          <p className="font-semibold">We use cookies & similar technologies</p>
          <p className="text-sm text-gray-600">
            We use cookies to personalize content, analyze traffic, and provide
            core platform features. By clicking accept you consent to our use of
            cookies as described in our{" "}
            <a href="/privacy#cookies" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={manage}
            className="px-3 py-2 rounded-md border border-gray-300 text-sm"
          >
            Manage
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
