"use client";

import { Card, CardContent } from "@/components/ui/cards/card";
import { PrimaryButton } from "@/components/ui";
import SessionItem from "./SessionItem";

export default function SessionManagement() {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Session Management
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Active Sessions</h3>
              <p className="text-sm text-gray-600">
                Manage where you&apos;re logged in across all devices.
                You&apos;ll need to sign in again on logged out devices.
              </p>
            </div>
            <PrimaryButton variant="outline" className="text-sm px-4 py-2">
              Log out everywhere
            </PrimaryButton>
          </div>

          <div className="space-y-3">
            <SessionItem
              device="Desktop Device"
              location="iOS • Lagos • 5 minutes ago"
              isActive={true}
            />
            <SessionItem
              device="iPhone"
              location="iOS • Lagos • 5 minutes ago"
            />
            <SessionItem device="iPad" location="iOS • Lagos • 1 day ago" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
