"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 2000); // reset success state after 2s
    }, 1200);
  };

  return (
    <div className="flex justify-center w-full">
      <div
        className="
          flex items-center gap-2
          w-full
          bg-[#EEECFB]
          border border-[#EAEBF0]
          rounded-[12px]
          p-[9px]
        "
      >
        {/* Input field */}
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            flex-1
            h-[48px]
            px-4
            bg-transparent
            text-sm text-gray-700
            placeholder-gray-500
            focus:outline-none
          "
        />

        {/* Subscribe button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading || success}
          className={`
            flex justify-center items-center
            w-[143px] h-[48px]
            px-[20px] py-[12px]
            rounded-[8px]
            text-sm font-medium
            transition-all duration-200
            ${
              success
                ? "bg-green-500 text-white"
                : "bg-[#2B007A] text-white hover:bg-[#3a0099]"
            }
          `}
        >
          {loading ? "..." : success ? "Subscribed!" : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
