"use client";

import { useAuth } from "@/context/AuthContexts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      switch (user.userRole) {
        case "ADMIN":
          router.replace("/dashboard/admin");
          break;
        case "VENDOR":
          router.replace("/dashboard/vendor");
          break;
        case "USER":
        default:
          router.replace("/dashboard/user");
          break;
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
