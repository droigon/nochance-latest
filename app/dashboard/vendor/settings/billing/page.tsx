"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContexts";
import {
  SubscriptionService,
  Subscription,
  SubscriptionAuthorizationResponse,
  Invoice,
} from "@/services/subscription/subscription";

export default function BillingPage() {
  const { user, business } = useAuth();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState("premium");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<{
    card: string;
    expires: string;
  } | null>(null);

  const plans = [
    { id: "free", title: "Free", price: "₦0" },
    { id: "premium", title: "Premium", price: "₦20" },
    { id: "advanced", title: "Advanced", price: "₦200" },
  ];

  const fetchSubscription = useCallback(async () => {
    if (!business?.id) return;

    try {
      const data = await SubscriptionService.getSubscription(business.id);
      if (data.success && data.data) {
        setSubscription(data.data);
        setCurrentPlan(data.data.planType || "premium");

        // Extract payment method from metadata
        if (data.data.meta?.authorization) {
          const auth = data.data.meta.authorization;
          const last4 = auth.last4 || "****";
          const brand = auth.brand || "Card";
          const expMonth = auth.exp_month || "**";
          const expYear = auth.exp_year || "****";
          setPaymentMethod({
            card: `${brand} ending in ${last4}`,
            expires: `${expMonth}/${expYear}`,
          });
        } else if (data.data.meta?.paystackData?.authorization) {
          const auth = data.data.meta.paystackData.authorization;
          const last4 = auth.last4 || "****";
          const brand = auth.brand || "Card";
          const expMonth = auth.exp_month || "**";
          const expYear = auth.exp_year || "****";
          setPaymentMethod({
            card: `${brand} ending in ${last4}`,
            expires: `${expMonth}/${expYear}`,
          });
        }
      }
    } catch {
      // Silently fail - use default plan
    }
  }, [business?.id]);

  const fetchInvoices = useCallback(async () => {
    if (!business?.id) return;

    setInvoicesLoading(true);
    try {
      const data = await SubscriptionService.getInvoices(business.id, {
        page: 1,
        limit: 10,
      });
      if (data.success && data.data) {
        setInvoices(data.data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setInvoicesLoading(false);
    }
  }, [business?.id]);

  useEffect(() => {
    fetchSubscription();
    fetchInvoices();
  }, [fetchSubscription, fetchInvoices]);

  // Check for payment success callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      fetchSubscription();
      fetchInvoices();
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [fetchSubscription, fetchInvoices]);

  const handleSubscribe = async (planId: string) => {
    if (!business?.id || !user?.email) {
      alert("Please ensure you're logged in and have a business account");
      return;
    }

    setLoading(true);
    try {
      const data = await SubscriptionService.createSubscription({
        businessId: business.id,
        planType: planId as "free" | "premium" | "advanced",
        billingCycle: "monthly",
        email: user.email,
      });

      if (data.success && data.data) {
        const authResponse = data.data as SubscriptionAuthorizationResponse;
        if (authResponse.authorizationUrl) {
          window.location.href = authResponse.authorizationUrl;
          return;
        }

        const subscription = data.data as Subscription;
        setCurrentPlan(subscription.planType);
        setSubscription(subscription);
        alert("Subscription updated successfully!");
        await fetchSubscription();
      } else {
        alert(data.message || "Failed to update subscription");
      }
    } catch {
      alert("Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return null;
    }
  };

  const formatCurrency = (amount: number, currency: string = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const nextBillingDate = formatDate(subscription?.nextBillingDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-800">
          Billing and Subscription
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your plan, payments, and upgrade anytime.
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <div className="flex items-center gap-2 text-sm text-indigo-700">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            You are on the{" "}
            <strong>
              {plans.find((p) => p.id === currentPlan)?.title || "Free"} Plan
            </strong>
            {nextBillingDate && (
              <>
                {" "}
                - Next billing date: <strong>{nextBillingDate}</strong>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Choose Your Plan Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Choose Your Plan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`border rounded-xl p-5 flex flex-col transition-all ${
                p.id === currentPlan
                  ? "border-indigo-500 ring-2 ring-indigo-100 bg-indigo-50/30"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">
                  {p.title}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {p.price}
                  </span>
                  <span className="text-sm text-gray-500">/month</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  <li className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>CAC & TIN Verification</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Address & Contact Validation</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-gray-700">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Business Compliance Check</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSubscribe(p.id)}
                disabled={loading || p.id === currentPlan}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  p.id === currentPlan
                    ? "bg-indigo-600 text-white cursor-not-allowed"
                    : p.id === "free" && currentPlan !== "free"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Processing..."
                  : p.id === currentPlan
                  ? "Current Plan"
                  : p.id === "free" && currentPlan !== "free"
                  ? "Downgrade"
                  : p.id !== "free" && currentPlan === "free"
                  ? "Upgrade"
                  : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment & Invoices Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-6">
          Payment & Invoices
        </h3>

        {/* Payment Method */}
        <div className="mb-8">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Payment Method
          </h4>
          {paymentMethod ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {paymentMethod.card}
                  </div>
                  <div className="text-xs text-gray-500">
                    Expires {paymentMethod.expires}
                  </div>
                </div>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Change
              </button>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-600">
              No payment method on file. Add a payment method when subscribing
              to a paid plan.
            </div>
          )}
        </div>

        {/* Recent Invoices */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900">
              Recent Invoices
            </h4>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Last 3 months
            </button>
          </div>

          {invoicesLoading ? (
            <div className="text-center py-8 text-sm text-gray-500">
              Loading invoices...
            </div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500 border border-gray-100 rounded-lg">
              No invoices found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoices.slice(0, 5).map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {formatDate(invoice.createdAt) || "N/A"}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        {formatCurrency(
                          Number(invoice.amount),
                          invoice.currency
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-sm font-medium ${getStatusColor(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-700">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
