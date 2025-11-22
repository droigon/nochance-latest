import type { Metadata } from "next";
import "../globals.css";
import { Onest } from "next/font/google";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { AuthProvider } from "@/context/AuthContexts";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nochance Application Technologies",
  description:
    "Nigeria's trusted platform connecting buyers with verified sellers. Check trust scores, read reviews, and shop safely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${onest.variable} font-onest antialiased`}>
        <AuthProvider>
          <div className="flex h-screen">
            {/* Sidebar */}
            {/* Main Content */}
            <div className="flex flex-1 flex-col">
              <main className="overflow-y-auto ">
                {children}
                <ToastProvider /> {/* ✅ Global toast */}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
