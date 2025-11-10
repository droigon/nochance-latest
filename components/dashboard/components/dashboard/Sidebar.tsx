"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Settings,
  ChevronRight,
  ShieldCheck,
  FileText,
  User,
  Building2,
  Upload,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const links = [
    { name: "Dashboard", href: "/", icon: ShieldCheck },
    { name: "Manage Reviews", href: "/verifications/personal", icon: FileText },
    { name: "Get Reviews", href: "reviews", icon: User },
    { name: "Analytics", href: "#", icon: Building2 },
    { name: "Settings", href: "settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center justify-center border-b">
        <Link href="/">
          <Image
            src="/assets/logo/svg/Nochance_logo.svg"
            alt="Nochance Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ name, icon: Icon, href }) => (
          <Link key={name} href={`/dashboard/vendor/${href}`}>
            <button
              onClick={() => setActive(name)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                active === name
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-purple-50 p-4 text-center">
          <p className="text-sm text-gray-700 mb-2">
            You are on the free plan, please upgrade!
          </p>
          <button className="w-full rounded-md bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
