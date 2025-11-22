import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/context/AuthContexts";
import { ToastProvider } from "@/components/ui/ToastProvider";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${onest.variable} font-onest antialiased`}>
        <AuthProvider>
          {children}
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
