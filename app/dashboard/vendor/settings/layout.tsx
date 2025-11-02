"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname() || "";
  const active = (slug: string) => path.includes(`/dashboard/settings/${slug}`);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account preferences, notifications, and integrations
          </p>
        </header>

        <nav className="mb-6 border-b border-gray-200">
          <ul className="flex gap-6 text-sm text-gray-600">
            <li>
              <Link
                href="/dashboard/settings/profile"
                className={
                  active("profile")
                    ? "pb-3 text-indigo-600 border-b-2 border-indigo-600"
                    : "pb-3 hover:text-gray-800"
                }
              >
                Profile settings
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings/notifications"
                className={
                  active("notifications")
                    ? "pb-3 text-indigo-600 border-b-2 border-indigo-600"
                    : "pb-3 hover:text-gray-800"
                }
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings/integration"
                className={
                  active("integration")
                    ? "pb-3 text-indigo-600 border-b-2 border-indigo-600"
                    : "pb-3 hover:text-gray-800"
                }
              >
                Integration
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings/security"
                className={
                  active("security")
                    ? "pb-3 text-indigo-600 border-b-2 border-indigo-600"
                    : "pb-3 hover:text-gray-800"
                }
              >
                Security
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings/billing"
                className={
                  active("billing")
                    ? "pb-3 text-indigo-600 border-b-2 border-indigo-600"
                    : "pb-3 hover:text-gray-800"
                }
              >
                Billings & Subscription
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <main className="lg:col-span-2">{children}</main>
          <aside className="space-y-4">{/* optional sidebar content */}</aside>
        </div>
      </div>
    </div>
  );
}
