"use client";

import Image from "next/image";
import Link from "next/link";

const trustedCompanies = [
  {
    name: "Dojah",
    logo: "/assets/3rd-party/dojah.png",
    url: "https://dojah.io",
    alt: "Dojah Logo",
  },
  {
    name: "Prembly",
    logo: "/assets/3rd-party/prembly.svg",
    url: "https://prembly.com",
    alt: "Prembly Logo",
  },
  {
    name: "Termii",
    logo: "/assets/3rd-party/termii.svg",
    url: "https://termii.com",
    alt: "Termii Logo",
  },
  {
    name: "Moniepoint",
    logo: "/assets/3rd-party/mfb.png",
    url: "https://moniepoint.com",
    alt: "Moniepoint Logo",
  },
  {
    name: "CAC",
    logo: "/assets/3rd-party/cac.png",
    url: "https://cac.gov.ng",
    alt: "CAC Logo",
  },
];

export default function TrustedCompanies() {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-grey-98 border-t relative">
      <p className="text-center text-grey-24 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
        Trusted by credible Companies
      </p>

      {/* Constrained wrapper */}
      <div className="relative max-w-6xl mx-auto overflow-hidden px-2">
        {/* Fading shadows on both ends */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-grey-98 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-l from-grey-98 to-transparent z-20" />

        {/* Scrolling container */}
        <div
          className="flex hover:[animation-play-state:paused]"
          style={{
            animation: "marquee-desktop 25s linear infinite",
          }}
        >
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mx-2 sm:mx-4 md:mx-6 min-w-max">
              {trustedCompanies.map((company, i) => (
                <Link
                  key={`${idx}-${i}`}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block flex-shrink-0"
                >
                  <Image
                    src={company.logo}
                    alt={company.alt}
                    width={120}
                    height={40}
                    className="w-20 h-auto sm:w-24 md:w-28 lg:w-32 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        /* Desktop animation */
        @keyframes marquee-desktop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Mobile: slower and smoother */
        @media (max-width: 768px) {
          div[style*="marquee-desktop"] {
            animation: marquee-mobile 40s linear infinite;
          }

          @keyframes marquee-mobile {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        }
      `}</style>
    </section>
  );
}
