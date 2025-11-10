"use client";
import { useState, useEffect } from "react";
import { Star, Flag, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { StatsCard } from "../dashboard/StatsCard";
import { PrimaryButton } from "@/components/ui";
import { useAuth } from "@/context/AuthContexts";

export default function DashboardPage() {
  const { user } = useAuth();
  console.log("Dashboard user:", user);
  const [activeTab, setActiveTab] = useState("reviews");
  const [stats, setStats] = useState({
    reviewsPosted: 0,
    reportsSubmitted: 0,
    trustedSellers: 0,
  });
  const [tabData, setTabData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { key: "reviews", label: "My Reviews", icon: <Star className="w-4 h-4" /> },
    { key: "reports", label: "My Reports", icon: <Flag className="w-4 h-4" /> },
    {
      key: "sellers",
      label: "Trusted Sellers",
      icon: <Bookmark className="w-4 h-4" />,
    },
  ];

  // Fetch stats from user profile
  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // For now, set default values - shows 0 until API is connected
        setStats({
          reviewsPosted: 0,
          reportsSubmitted: 0,
          trustedSellers: 0,
        });

        // TODO: Uncomment when the API endpoint is ready
        // const response = await fetch(`/api/dashboard/stats`, {
        //   credentials: 'include',
        // });
        //
        // if (response.ok) {
        //   const data = await response.json();
        //   if (data.success) {
        //     setStats(data.data);
        //   }
        // }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  // Fetch tab data
  useEffect(() => {
    async function fetchTabData() {
      if (!user) return;

      setTabLoading(true);
      setError(null);

      try {
        // Set default empty data first
        setTabData([]);

        // TODO: Uncomment when the API endpoint is ready
        // const response = await fetch(`/api/dashboard/${activeTab}`, {
        //   credentials: 'include',
        // });

        // if (response.ok) {
        //   const data = await response.json();
        //   if (data.success) {
        //     setTabData(data.data || []);
        //   } else {
        //     setError(data.message || 'Failed to load data');
        //   }
        // } else {
        //   setError(`HTTP ${response.status}: Failed to load ${activeTab}`);
        // }
      } catch (err) {
        console.error("Error fetching tab data:", err);
        setError(`Failed to load ${activeTab} data`);
        setTabData([]);
      } finally {
        setTabLoading(false);
      }
    }

    fetchTabData();
  }, [activeTab, user]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded-md w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user?.email || "User"}!
      </h1>

      {/* Stats Cards - Shows 0 by default until API provides real data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Reviews Posted"
          value={stats.reviewsPosted}
          icon={<Star className="w-6 h-6" />}
        />
        <StatsCard
          label="Reports Submitted"
          value={stats.reportsSubmitted}
          icon={<Flag className="w-6 h-6" />}
        />
        <StatsCard
          label="Trusted Sellers"
          value={stats.trustedSellers}
          icon={<Bookmark className="w-6 h-6" />}
        />
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.key
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-600 mb-2">{error}</div>
                <PrimaryButton
                  onClick={() => window.location.reload()}
                  className="mt-2"
                >
                  Retry
                </PrimaryButton>
              </div>
            ) : tabLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 mt-2">
                  Loading {tabs.find((t) => t.key === activeTab)?.label}...
                </p>
              </div>
            ) : tabData.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-2">
                  No{" "}
                  {tabs.find((t) => t.key === activeTab)?.label.toLowerCase()}{" "}
                  yet
                </div>
                <p className="text-gray-400 text-sm">
                  Start engaging with the platform to see your activity here
                </p>
                <PrimaryButton className="mt-4">Get Started</PrimaryButton>
              </div>
            ) : (
              <div className="space-y-4">
                {tabData.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      {JSON.stringify(item, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Current State (Debug Info)
        </h3>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>
            <span className="font-medium">Active Tab:</span> {activeTab}
          </li>
          <li>
            <span className="font-medium">Tab Loading:</span>{" "}
            {tabLoading ? "Yes" : "No"}
          </li>
          <li>
            <span className="font-medium">Data Count:</span> {tabData.length}{" "}
            items
          </li>
          <li>
            <span className="font-medium">Stats:</span> Reviews:{" "}
            {stats.reviewsPosted}, Reports: {stats.reportsSubmitted}, Trusted:{" "}
            {stats.trustedSellers}
          </li>
          <li className="break-all">
            <span className="font-medium">User:</span>{" "}
            {user ? `${user.email}` : "Not logged in"}
          </li>
        </ul>
      </div>
    </div>
  );
}
