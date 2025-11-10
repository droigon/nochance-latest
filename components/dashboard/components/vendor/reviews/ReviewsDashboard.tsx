"use client";

// import { useState } from "react"; // For future state management
import { Mail, Star, Clock, RotateCcw, X } from "lucide-react";

interface ReviewsDashboardProps {
  onStartCollecting: () => void;
}

interface Review {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  rating: number;
  status: "pending" | "completed" | "failed";
  sentDate: string;
  action?: "resend" | "cancel";
}

export default function ReviewsDashboard({ }: ReviewsDashboardProps) {
  // const [activeFilter, setActiveFilter] = useState("all"); // For future filtering functionality

  // Sample data matching the design
  const stats = {
    invitationsSent: 270,
    reviewsCollected: 89,
    pendingInvitations: 158
  };

  const reviews: Review[] = [
    {
      id: "1",
      customer: {
        name: "May Cooper",
        email: "maya.2mail@domain.com",
        avatar: "MC"
      },
      rating: 5,
      status: "pending",
      sentDate: "Jun 30, 2025",
      action: "resend"
    },
    {
      id: "2",
      customer: {
        name: "Phoenix Smith",
        email: "phoenix.2mail@domain.com",
        avatar: "PS"
      },
      rating: 5,
      status: "completed",
      sentDate: "Jul 15, 2025"
    },
    {
      id: "3",
      customer: {
        name: "Leon Boggart",
        email: "leon.2mail@domain.com",
        avatar: "LB"
      },
      rating: 5,
      status: "completed",
      sentDate: "Apr 28, 2025"
    },
    {
      id: "4",
      customer: {
        name: "Ana Zika",
        email: "ana.2mail@domain.com",
        avatar: "AZ"
      },
      rating: 4,
      status: "failed",
      sentDate: "Mar 17, 2025",
      action: "resend"
    },
    {
      id: "5",
      customer: {
        name: "Sandra Lin",
        email: "sandra.2mail@domain.com",
        avatar: "SL"
      },
      rating: 5,
      status: "completed",
      sentDate: "Feb 16, 2025"
    },
    {
      id: "6",
      customer: {
        name: "Olivia Reed",
        email: "olivia.2mail@domain.com",
        avatar: "OR"
      },
      rating: 5,
      status: "completed",
      sentDate: "Jul 20, 2025"
    },
    {
      id: "7",
      customer: {
        name: "Sally Cooper",
        email: "sally.2mail@domain.com",
        avatar: "SC"
      },
      rating: 3,
      status: "failed",
      sentDate: "Jun 16, 2025",
      action: "cancel"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-orange-600 bg-orange-100";
      case "completed": return "text-green-600 bg-green-100";
      case "failed": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <Star className="h-4 w-4" />;
      case "failed": return <X className="h-4 w-4" />;
      default: return null;
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="px-6 pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Invitations Sent</p>
                <p className="text-3xl font-bold text-gray-900">{stats.invitationsSent}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Reviews Collected</p>
                <p className="text-3xl font-bold text-gray-900">{stats.reviewsCollected}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Invitations</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingInvitations}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Sent
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm mr-3">
                          {review.customer.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {review.status === "completed" && (
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                          {getStatusIcon(review.status)}
                          {review.status === "completed" ? "Completed" : 
                           review.status === "pending" ? "Pending" : "Failed"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {review.sentDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {review.status === "completed" && (
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                            View
                          </button>
                        )}
                        {review.action === "resend" && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                            <RotateCcw className="h-3 w-3" />
                            Resend
                          </button>
                        )}
                        {review.action === "cancel" && (
                          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Prev</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded bg-purple-600 text-white text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 rounded text-gray-600 text-sm hover:bg-gray-100">
                2
              </button>
              <button className="w-8 h-8 rounded text-gray-600 text-sm hover:bg-gray-100">
                3
              </button>
              <span className="text-gray-400">...</span>
              <button className="w-8 h-8 rounded text-gray-600 text-sm hover:bg-gray-100">
                8
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-600 font-medium cursor-pointer hover:text-purple-800">
                Next →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}