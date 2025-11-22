"use client";

import { useState } from "react";
import { X, Mail, Link, Smartphone, QrCode } from "lucide-react";

interface ReviewsCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewsCollectionModal({
  isOpen,
  onClose,
}: ReviewsCollectionModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  if (!isOpen) return null;

  const collectionMethods = [
    {
      id: "email",
      title: "Email Invitations",
      description:
        "Upload email addresses to send personalized invitations directly to past customers for their reviews.",
      icon: Mail,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "shareable",
      title: "Shareable Link",
      description:
        "Generate a link that you can share via social media or websites to let anyone leave a review.",
      icon: Link,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "sms",
      title: "Website Widget",
      description:
        "Embed a simple review widget directly on your website to capture feedback from visitors.",
      icon: Smartphone,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "qr",
      title: "QR Code",
      description:
        "Generate a QR code to display in your physical location for easy access to your review page.",
      icon: QrCode,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Choose your review collection method
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedMethod === method.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${method.color} flex-shrink-0`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Generate Link Section */}
          {selectedMethod && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Generate Link</h3>
              <p className="text-sm text-gray-600 mb-3">
                Your personalized review collection link:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value="https://nochance.app/reviews/your-business-123"
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                />
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={!selectedMethod}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedMethod
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
