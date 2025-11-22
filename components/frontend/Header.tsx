"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContexts";

export default function Header() {
  const { user: contextUser, logout, loading } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const user = contextUser;

  const getUserName = (): string => {
    if (!user) return "";
    if (user.name?.trim()) return user.name;
    if (user.email) return user.email.split("@")[0];
    return "User";
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setIsDropdownOpen(false);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover handlers
  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay to allow moving cursor from trigger → dropdown smoothly
    hoverTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="flex justify-between items-center py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-28 2xl:px-32 bg-white shadow-sm sticky top-0 z-40">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg md:text-xl font-bold text-purple-700"
      >
        <Image
          src="/assets/logo/svg/Nochance_logo.svg"
          alt="Nochance Logo"
          width={150}
          height={40}
          className="w-24 sm:w-32 md:w-40 h-auto"
        />
      </Link>

      <nav className="hidden md:flex gap-4 lg:gap-6 text-xs lg:text-sm text-gray-700">
        <Link href="/Search" className="hover:text-purple-600 transition">
          Search
        </Link>
        <Link href="/write-review" className="hover:text-purple-600 transition">
          Write a Review
        </Link>
        <Link href="/categories" className="hover:text-purple-600 transition">
          Categories
        </Link>
        <Link href="/report-scam" className="hover:text-purple-600 transition">
          Report A Scam
        </Link>
        <Link href="/blog" className="hover:text-purple-600 transition">
          Blog
        </Link>
        <Link href="/contact-us" className="hover:text-purple-600 transition">
          Contact Us
        </Link>
      </nav>

      {loading ? (
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      ) : user ? (
        <div
          ref={dropdownRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex items-center gap-1 md:gap-2 cursor-pointer group"
            onClick={() => setIsDropdownOpen((prev) => !prev)} // Click for mobile
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-xs md:text-sm">
              {getUserName().charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline font-medium text-xs md:text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
              {getUserName()}
            </span>
            <ChevronDown
              className={`w-3 h-3 md:w-4 md:h-4 text-gray-400 transition-all duration-200 transform ${
                isDropdownOpen
                  ? "rotate-180 text-purple-600"
                  : "group-hover:text-purple-600"
              }`}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 md:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <hr className="my-2 border-gray-100" />
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-3 px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut
                  className={`w-4 h-4 ${isLoggingOut ? "animate-spin" : ""}`}
                />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/login"
            className="px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-600 text-purple-600 text-xs sm:text-sm rounded-lg hover:bg-purple-50 transition"
          >
            Login
          </Link>
          <Link
            href="/business"
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:opacity-90 transition"
          >
            For Businesses →
          </Link>
        </div>
      )}
    </header>
  );
}
