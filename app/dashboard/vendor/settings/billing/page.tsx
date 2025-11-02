// ...existing code...
"use client";
import { useState } from "react";

export default function BillingPage() {
  const plans = [
    { id: "free", title: "Free", price: "$0" },
    { id: "premium", title: "Premium", price: "$29" },
    { id: "advanced", title: "Advanced", price: "$99" },
  ];
  const [currentPlan, setCurrentPlan] = useState("premium");
  const [paymentMethod] = useState({
    card: "Visa ending in 4242",
    expires: "12/2027",
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800">
          Billing and Subscription
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage your plan, payments, and upgrade anytime.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-md p-4 text-sm text-indigo-700 mb-4">
          You are on the <strong>Standard Plan</strong> - Next billing date:{" "}
          <strong>15 Oct 2025</strong>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`border rounded-lg p-4 flex flex-col justify-between ${p.id === currentPlan ? "border-indigo-500 ring-1 ring-indigo-50" : "border-gray-100"}`}
            >
              <div>
                <div className="text-sm font-medium">{p.title}</div>
                <div className="text-2xl font-semibold mt-2">{p.price}</div>
                <div className="text-xs text-gray-500 mt-2">per month</div>

                <ul className="mt-4 text-sm space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> CAC & Tin
                    Verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Address & Contact
                    validation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Business
                    Compliance Check
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setCurrentPlan(p.id)}
                  className={`w-full py-2 rounded-md text-sm ${p.id === currentPlan ? "bg-purple-600 text-white" : "bg-white border border-gray-200 text-gray-700"}`}
                >
                  {p.id === currentPlan ? "Current Plan" : "Choose"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-800">
          Payment & Invoices
        </h3>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">{paymentMethod.card}</div>
              <div className="text-xs text-gray-400">
                Expires {paymentMethod.expires}
              </div>
            </div>
            <button className="text-sm text-indigo-600">Change</button>
          </div>

          <div className="mt-6">
            <button
              onClick={() => alert("Viewing invoices")}
              className="text-sm text-indigo-600"
            >
              View invoices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
