"use client";
import { useState } from "react";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    email: true,
    newReviews: true,
    weekly: false,
    reminder: true,
  });

  const toggle = (k: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800">
        Notification preference
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Choose how you want to receive notification and alerts
      </p>

      <div className="divide-y divide-gray-100">
        {[
          {
            key: "email",
            title: "Email notifications",
            desc: "Receive notification via email",
          },
          {
            key: "newReviews",
            title: "New review alerts",
            desc: "Get notified when new reviews are submitted",
          },
          {
            key: "weekly",
            title: "Weekly Reports",
            desc: "Receive weekly analytics summaries",
          },
          {
            key: "reminder",
            title: "Response Reminder",
            desc: "Reminders for unanswered reviews",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="py-4 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-medium text-gray-800">
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
            <button
              onClick={() => toggle(item.key as any)}
              className={`w-11 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? "bg-purple-600" : "bg-gray-200"}`}
              aria-pressed={settings[item.key as keyof typeof settings]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
