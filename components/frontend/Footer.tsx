import SubscribeForm from "./SubscribeForm";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 md:px-8 lg:px-[112px] py-8 sm:py-12 md:py-16 lg:py-[96px] gap-[10px] border-purple-900 bg-[#2D0077]
        shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center self-stretch"
    >
      {/* Grid: now aligned properly */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 text-gray-300 items-start">
        {/* Logo */}
        <div className="sm:col-span-2 md:col-span-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-purple-700"
          >
            <Image
              src="/assets/logo/Nochance_Logo_White.png"
              alt="Nochance Logo"
              width={150}
              height={40}
              className="w-32 sm:w-40 h-auto"
            />
          </Link>

          <p className="p-0 sm:p-2 text-white text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">
            Protecting genuine businesses from scams and building trust with
            customers
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-semibold">Useful Link</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-purple-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">About</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Contact us</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-semibold">Follow Us</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li><a href="#" className="hover:text-purple-400 transition">Facebook</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">Instagram</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-purple-400 transition">X</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-semibold">Legal</h3>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <li>
              <Link href="/terms" className="hover:text-purple-400 transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-purple-400 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter — fits on same row now */}
        <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 flex flex-col justify-start items-start lg:items-end lg:self-start">
          <h3 className="text-white mb-2 sm:mb-3 text-base sm:text-lg md:text-xl font-semibold text-left lg:text-right whitespace-normal lg:whitespace-nowrap">
            Subscribe to our newsletter
          </h3>
          <div className="w-full max-w-sm">
            <SubscribeForm />
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Nochance Technologies Limited. All rights
        reserved.
      </div>
    </footer>
  );
}
