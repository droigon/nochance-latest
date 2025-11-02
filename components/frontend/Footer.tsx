import SubscribeForm from "./SubscribeForm";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className=" px-[112px] py-[96px]  gap-[10px] border-purple-900 bg-[#2D0077]
        shadow-[0_4px_4px_rgba(0,0,0,0.25)] items-center self-stretch"
    >
      {/* Grid: now aligned properly */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 text-gray-300 items-start">
        {/* Logo */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-purple-700"
          >
            <Image
              src="/assets/logo/Nochance_Logo_White.png"
              alt="Nochance Logo"
              width={150}
              height={40}
            />
          </Link>

          <p className="p-2 text-white text-sm">
            Protecting genuine businesses from scams and building trust with
            customers
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-white mb-3 text-xl font-normal">Useful Link</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Features</li>
            <li>About</li>
            <li>Careers</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white mb-3 text-xl font-normal">Follow Us</h3>
          <ul className="space-y-2">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
            <li>X</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white mb-3 text-xl font-normal">Legal</h3>
          <ul className="space-y-2">
            <Link href="/terms">
              <li>Terms of Service</li>
            </Link>
            <Link href="/privacy">
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>

        {/* Newsletter — fits on same row now */}
        <div className="md:col-span-2 flex flex-col justify-start items-start md:items-end md:self-start">
          <h3 className="text-white mb-3 text-xl font-normal text-left md:text-right whitespace-nowrap">
            Subscribe to our newsletter
          </h3>
          <div className="w-full max-w-sm">
            <SubscribeForm />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Nochance Technologies Limited. All rights
        reserved.
      </div>
    </footer>
  );
}
