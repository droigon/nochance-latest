"use client";
import { useState, useEffect } from "react";
import { Star, Flag, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { StatsCard } from "../dashboard/StatsCard";
import { PrimaryButton } from "@/components/ui";
import { useAuth } from "@/context/AuthContexts";

const API_BASE = "http://localhost:2000/api/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("reviews");
  const [stats, setStats] = useState({
    reviewsPosted: 0,
    reportsSubmitted: 0,
    trustedSellers: 0,
  });
  const [tabData, setTabData] = useState<any[]>([]);
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
        // For now, set default values
        setStats({
          reviewsPosted: 0,
          reportsSubmitted: 0,
          trustedSellers: 0,
        });

        // You can uncomment this when the API endpoint is ready
        // const response = await fetch(`${API_BASE}/stats`, {
        //   credentials: 'include',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   }
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

        // You can uncomment this when the API endpoint is ready
        // const response = await fetch(`${API_BASE}/${activeTab}`, {
        //   credentials: 'include',
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //   }
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

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto space-y-6 px-4">
        {/* Dashboard Header */}
        <div>
          <h2 className="text-lg font-bold text-gray-900">My Dashboard</h2>
          <p className="text-sm text-gray-500">
            Manage your reviews, reports, and trusted sellers
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
            </>
          ) : (
            <>
              <StatsCard
                icon={<Star className="text-[#6B01FF]" fill="currentColor" />}
                label="Reviews Posted"
                value={stats.reviewsPosted}
              />
              <StatsCard
                icon={<Flag className="text-[#DC2626]" fill="currentColor" />}
                label="Reports Submitted"
                value={stats.reportsSubmitted}
              />
              <StatsCard
                icon={
                  <Bookmark className="text-[#1E1D1D]" fill="currentColor" />
                }
                label="Trusted Sellers"
                value={stats.trustedSellers}
              />
            </>
          )}
        </div>

        {/* Tabs */}
        <Card className="border border-gray-200 shadow-sm">
          <div className="flex border-b text-sm font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 transition ${
                  activeTab === tab.key
                    ? "text-[#6B01FF] border-b-2 border-[#6B01FF]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <CardContent>
            {tabLoading ? (
              <p className="text-center text-gray-500 py-10">Loading...</p>
            ) : tabData.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="divide-y">
                {tabData.map((item) => (
                  <li key={item.id} className="py-4 text-sm">
                    {activeTab === "reviews" && (
                      <p>
                        <strong>{item.business}</strong> — ⭐ {item.rating}/5 —{" "}
                        {item.comment}
                      </p>
                    )}
                    {activeTab === "reports" && (
                      <p>
                        Reported <strong>{item.business}</strong> —{" "}
                        {item.reason} ({item.date})
                      </p>
                    )}
                    {activeTab === "sellers" && (
                      <p>
                        <strong>{item.name}</strong> —{" "}
                        {item.verified ? "✅ Verified" : "❌ Unverified"}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return <div className="animate-pulse bg-gray-100 p-6 rounded-lg h-[100px]" />;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="bg-purple-50 rounded-lg p-4 w-32 h-32 flex items-center justify-center">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-16 h-3 bg-purple-200 rounded-md"></div>
          <div className="w-12 h-3 bg-purple-300 rounded-md"></div>
          <div className="w-10 h-3 bg-purple-200 rounded-md"></div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">No data found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          You haven’t added anything yet — start by finding a business to
          review!
        </p>
      </div>
      <PrimaryButton variant="gradientRounded">Find a business</PrimaryButton>
    </div>
  );
}
