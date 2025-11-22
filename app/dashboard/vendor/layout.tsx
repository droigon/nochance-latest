// src/app/layout.tsx

import Providers from "./providers";
import Sidebar from "@/components/dashboard/components/dashboard/Sidebar";
import Header from "@/components/dashboard/components/dashboard/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a server component. We put client-only providers in ./providers.tsx
  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </Providers>
  );
}

