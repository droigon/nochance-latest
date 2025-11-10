"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContexts";

export default function Header() {
  const { user: contextUser, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Use context user primarily
  const user = contextUser;

  // Helper to get user name
  const getUserName = (): string => {
    if (!user) return "";
    if (user.fullName && user.fullName.trim()) return user.fullName;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsDropdownOpen(false);
    
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect to login on error
      window.location.href = '/login';
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-16 lg:px-28 xl:px-32 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-purple-700"
      >
        <Image
          src="/assets/logo/svg/Nochance_logo.svg"
          alt="Nochance Logo"
          width={150}
          height={40}
        />
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex gap-6 text-gray-700">
        <Link href="/write-review">Write a Review</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/report-scam">Report A Scam</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>

      {/* Actions */}
      {loading ? (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      ) : user ? (
        // If logged in, show profile dropdown
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold">
              {getUserName().charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
              {getUserName()}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-all duration-200 transform group-hover:rotate-180" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <hr className="my-2 border-gray-100" />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className={`w-4 h-4 ${isLoggingOut ? 'animate-spin' : ''}`} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
          >
            Login
          </Link>
          <Link
            href="/business"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
          >
            For Businesses →
          </Link>
        </div>
      )}
    </header>
  );
}
