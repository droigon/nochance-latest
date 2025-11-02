"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-purple-700"
      >
        <Image
          src="/assets/logo/svg/Nochance_logo.svg"
          alt="Nochance Logo"
          width={150}
          height={40}
        />
      </Link>

      {/* Nav */}
      <nav className="hidden md:flex gap-6 text-gray-700">
        <Link href="/write-review">Write a Review</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/report-scam">Report A Scam</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
        >
          Login
        </Link>
        <Link
          href="/business"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
        >
          For Businesses →
        </Link>
      </div>
    </header>
  );
}
