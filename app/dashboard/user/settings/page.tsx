"use client";

import { useState, useEffect } from "react";
import VerificationBanner from "@/components/dashboard/components/user/settings/VerificationBanner";
import PersonalSettings from "@/components/dashboard/components/user/settings/PersonalSettings";
import NotificationSettings from "@/components/dashboard/components/user/settings/NotificationSettings";
import SecuritySettings from "@/components/dashboard/components/user/settings/SecuritySettings";
import SessionManagement from "@/components/dashboard/components/user/settings/SessionManagement";
import Header from "@/components/frontend/Header";
import GetStarted from "@/components/dashboard/components/user/GetStarted";
import { Check, X, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const [formData, setFormData] = useState({
    firstName: "Benny",
    lastName: "Mulla",
    email: "ns.design@ncc.com",
    language: "English",
    region: "Nigeria",
  });

  const [notifications, setNotifications] = useState({
    personalizedRecommendations: true,
    orderInfo: true,
    safetyTips: true,
    marketingEmails: true,
    accountActivity: true,
    orderFeedback: true,
    comments: false,
  });

  // Auto-save functionality
  const autoSave = async (data: any, type: "profile" | "notifications") => {
    setSaveStatus("saving");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Auto-saving ${type}:`, data);

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Clear previous timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }

    // Set new timeout for auto-save
    const timeout = setTimeout(() => {
      autoSave(updatedData, "profile");
    }, 1500); // Auto-save after 1.5 seconds of inactivity

    setAutoSaveTimeout(timeout);
  };

  const handleNotificationToggle = (key: string) => {
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    };
    setNotifications(updatedNotifications);

    // Immediate save for toggles
    autoSave(updatedNotifications, "notifications");
  };

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "billing", label: "Billing & Subscription", icon: "💳" },
    { id: "integration", label: "Integration Settings", icon: "🔗" },
  ];

  useEffect(() => {
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [autoSaveTimeout]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header with Save Status */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Save Status Indicator */}
            <div className="flex items-center space-x-2">
              {saveStatus === "saving" && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Saving...</span>
                </div>
              )}
              {saveStatus === "saved" && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Saved</span>
                </div>
              )}
              {saveStatus === "error" && (
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Error saving</span>
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-purple-500 text-purple-600 bg-purple-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <GetStarted />
                  <PersonalSettings
                    formData={formData}
                    onInputChange={handleInputChange}
                  />
                </div>
              )}

              {activeTab === "notifications" && (
                <NotificationSettings
                  notifications={notifications}
                  onNotificationToggle={handleNotificationToggle}
                />
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <SecuritySettings />
                  <SessionManagement />
                </div>
              )}

              {activeTab === "billing" && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💳</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Billing & Subscription
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Manage your billing information and subscription plans
                  </p>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Coming Soon
                  </button>
                </div>
              )}

              {activeTab === "integration" && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔗</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Integration Settings
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Connect with external services and manage API integrations
                  </p>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Coming Soon
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
