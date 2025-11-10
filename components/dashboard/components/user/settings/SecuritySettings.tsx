"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { PrimaryButton } from "@/components/ui";
import ChangePasswordModal from "./ChangePasswordModal";

export default function SecuritySettings() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Security & Privacy
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-600">
                Update your password to keep your account secure
              </p>
            </div>
            <PrimaryButton
              variant="outline"
              className="text-sm px-4 py-2"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </PrimaryButton>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-medium text-red-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-700 mb-3">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <PrimaryButton
              variant="outline"
              className="text-sm px-4 py-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              Delete Account
            </PrimaryButton>
          </div>
        </div>

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      </CardContent>
    </Card>
  );
}
