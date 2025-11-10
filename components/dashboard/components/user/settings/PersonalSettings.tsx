"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/cards/card";
import { Input } from "@/components/dashboard/components/ui";
import { PrimaryButton } from "@/components/ui";
import { Camera, CheckCircle, AlertCircle } from "lucide-react";

interface PersonalSettingsProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    language: string;
    region: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export default function PersonalSettings({
  formData,
  onInputChange,
}: PersonalSettingsProps) {
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "firstName":
      case "lastName":
        if (value.length < 2) {
          newErrors[field] = "Must be at least 2 characters";
        } else {
          delete newErrors[field];
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field] = "Please enter a valid email address";
        } else {
          delete newErrors[field];
        }
        break;
      default:
        delete newErrors[field];
    }

    setErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    onInputChange(field, value);
    validateField(field, value);
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus("uploading");

    try {
      // Simulate photo upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } catch (error) {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Profile Settings
        </h2>
        <p className="text-sm text-gray-600">
          Update your personal information and profile photo
        </p>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                BM
              </div>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <Camera className="h-4 w-4 text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900">Profile Photo</h3>
                {uploadStatus === "uploading" && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                )}
                {uploadStatus === "success" && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {uploadStatus === "error" && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="text-sm text-gray-600">
                {uploadStatus === "uploading" && "Uploading photo..."}
                {uploadStatus === "success" && "Photo updated successfully"}
                {uploadStatus === "error" && "Failed to upload photo"}
                {uploadStatus === "idle" && "JPG, GIF or PNG. Max size 2MB."}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`w-full transition-colors ${
                  errors.firstName ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`w-full transition-colors ${
                  errors.lastName ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full transition-colors ${
                  errors.email ? "border-red-300 focus:border-red-500" : ""
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Portuguese">Portuguese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => handleInputChange("region", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
              </select>
            </div>
          </div>

          {/* Auto-save note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Your changes are automatically saved as you type.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
