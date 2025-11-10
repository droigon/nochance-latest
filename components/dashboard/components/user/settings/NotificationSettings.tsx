"use client";

import { Card, CardContent } from "@/components/ui/cards/card";
import NotificationToggle from "./NotificationToggle";
import { Bell, Shield, Mail, Users } from "lucide-react";

interface NotificationSettingsProps {
  notifications: {
    personalizedRecommendations: boolean;
    orderInfo: boolean;
    safetyTips: boolean;
    marketingEmails: boolean;
    accountActivity: boolean;
    orderFeedback: boolean;
    comments: boolean;
  };
  onNotificationToggle: (key: string) => void;
}

export default function NotificationSettings({
  notifications,
  onNotificationToggle,
}: NotificationSettingsProps) {
  const notificationCategories = [
    {
      title: "Marketing Communications",
      description: "Control marketing emails and promotional content",
      icon: Mail,
      color: "text-blue-500 bg-blue-100",
      items: [
        {
          key: "personalizedRecommendations",
          label: "Personalized Recommendations",
          description:
            "We recommend listings for restaurants and categories based on your activity",
        },
        {
          key: "marketingEmails",
          label: "Marketing Emails",
          description:
            "Receive updates about new features, promotions, and special offers",
        },
      ],
    },
    {
      title: "Order & Activity Updates",
      description: "Stay informed about your orders and account activity",
      icon: Bell,
      color: "text-green-500 bg-green-100",
      items: [
        {
          key: "orderInfo",
          label: "Order Information",
          description: "Order view reports, notes you anticipation reviews",
        },
        {
          key: "accountActivity",
          label: "Account Activity",
          description: "Get notified about important changes to your account",
        },
        {
          key: "orderFeedback",
          label: "Order Feedback Requests",
          description: "Receive requests to review and rate your orders",
        },
      ],
    },
    {
      title: "Safety & Security",
      description: "Important notifications about platform safety",
      icon: Shield,
      color: "text-red-500 bg-red-100",
      items: [
        {
          key: "safetyTips",
          label: "Safety Tips & Alerts",
          description: "Important safety information and security updates",
        },
      ],
    },
    {
      title: "Community Engagement",
      description: "Notifications about community interactions",
      icon: Users,
      color: "text-purple-500 bg-purple-100",
      items: [
        {
          key: "comments",
          label: "Comments & Reviews",
          description:
            "Get notified when someone comments on your reviews or listings",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Notification Preferences
        </h2>
        <p className="text-sm text-gray-600">
          Choose what notifications you want to receive via email. Changes are
          saved automatically.
        </p>
      </div>

      <div className="space-y-6">
        {notificationCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.title}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 ml-16">
                  {category.items.map((item) => (
                    <NotificationToggle
                      key={item.key}
                      label={item.label}
                      description={item.description}
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onChange={() => onNotificationToggle(item.key)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Email preferences summary */}
      <Card className="border border-gray-200 shadow-sm bg-gray-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-gray-200">
              <Mail className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Email Frequency
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You will receive notification emails based on your preferences
                above. You can unsubscribe from all emails at any time.
              </p>
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                Manage email frequency settings
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
