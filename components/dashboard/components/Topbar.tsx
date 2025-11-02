"use client";

import { useState } from "react";
import { Bell, User } from "lucide-react"; // icons from lucide-react

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Left side (breadcrumbs or title) */}
      <h1 className="text-lg font-semibold">Dashboard</h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:block">John Doe</span>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded-md py-2">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Settings
              </button>
              <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
