"use client";
import React from "react";
import Header from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import HowChooseNochanceSectionx from "@/components/frontend/reviews/HowChooseNochanceSection";
import ShareExperienceSection from "@/components/frontend/reviews/ShareExperienceSection";
import FooterCTA from "@/components/frontend/FooterCTA";

export default function ReportScamPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero */}

      <ShareExperienceSection />

      <HowChooseNochanceSectionx />
      <FooterCTA />
      <Footer />
    </main>
  );
}
