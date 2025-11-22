"use client";
import { useState, useEffect } from "react";
import { Star, Flag, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { StatsCard } from "../dashboard/StatsCard";
import { PrimaryButton } from "@/components/ui";
import { useAuth } from "@/context/AuthContexts";
import { useStatsFresh } from "@/hooks/useStatsFresh";
import SearchBar from "@/components/frontend/SearchBar";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    stats: normalizedStats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useStatsFresh();

  const [activeTab, setActiveTab] = useState("reviews");
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

  // Initialize loading state once user is confirmed
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // Fetch tab data
  useEffect(() => {
    async function fetchTabData() {
      if (!user) return;

      setTabLoading(true);
      setError(null);

      try {
        setTabData([]);

        // TODO: Uncomment when API endpoint is ready
        // const response = await fetch(`/api/dashboard/${activeTab}`, { credentials: "include" });
        // if (response.ok) {
        //   const data = await response.json();
        //   if (data.success) setTabData(data.data || []);
        //   else setError(data.message || "Failed to load data");
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

  // Loading skeleton
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
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-10 space-y-6">
      <h3 className="text-2xl font-bold mb-2 text-gray-900">My Dashboard</h3>
      <p className="text-gray-600 ">
        Manage your reviews, reports, and trusted sellers
      </p>
      <div className="mt-8">
        <SearchBar />
      </div>
      {/* Stats Cards - uses normalized stats from useStats hook */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          label="Reviews Posted"
          value={normalizedStats.reviewsPosted}
          icon={<Star color="#6B01FF" fill="#6B01FF" className="w-6 h-6" />}
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          label="Reports Submitted"
          value={normalizedStats.reportsSubmitted}
          icon={<Flag color="#DC2626" fill="#DC2626" className="w-6 h-6" />}
          iconBgColor="bg-red-100"
        />
        <StatsCard
          label="Trusted Sellers"
          value={normalizedStats.trustedSellers}
          icon={<Bookmark color="#1E1D1D" fill="#1E1D1D" className="w-6 h-6" />}
          iconBgColor="bg-gray-100"
        />
      </div>
      ]{/* Tabs */}
      <Card className=" rounded-lg border-[#E5E7EB]">
        <CardContent className="p-0">
          <div className="border-b border-[#E5E7EB]">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.key
                        ? "border-[#6B01FF] text-[#6B01FF]"
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
                <PrimaryButton variant="solidRounded" className="mt-4">
                  Get Started
                </PrimaryButton>
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
    </div>
  );
}
