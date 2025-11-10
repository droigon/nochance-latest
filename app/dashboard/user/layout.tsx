// src/app/layout.tsx

import Footer from "@/components/frontend/Footer";
import Providers from "./providers";
import Header from "@/components/frontend/Header";
import GetStarted from "@/components/dashboard/components/user/GetStarted";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a server component. We put client-only providers in ./providers.tsx
  return (
    <Providers>
      <Header />
      <GetStarted />
      {children}
      <Footer />
    </Providers>
  );
}
