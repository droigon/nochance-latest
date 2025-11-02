"use client";
import { Bell, UserCircle, Cog } from "lucide-react";

export default function Header({
  userName = "Benny Mulla",
}: {
  userName?: string;
}) {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Hello, {userName}
        </h1>
        <p className="text-sm text-gray-600">
          Finish setting up your account to start getting reviews and invite
          customers
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Cog className="w-5 h-5 text-gray-600" />
        </button>

        <button className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-100">
          <UserCircle className="w-8 h-8 text-gray-600" />
          <div className="hidden sm:block text-sm text-gray-700">Account</div>
        </button>
      </div>
    </header>
  );
}
