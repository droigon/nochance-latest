"use client";

import Image from "next/image";

const logos = [
  "/logos/boltshift.png",
  "/logos/leapyear.png",
  "/logos/lightspeed.png",
  "/logos/polymath.png",
  "/logos/railspeed.png",
  "/logos/hourgi.png",
];

export default function TrustedLogos() {
  return (
    <section className="py-12 bg-grey-98 border-t overflow-hidden relative">
      <p className="text-center text-grey-24 text-md mb-6">
        Join 10,000+ verified businesses across Nigeria
      </p>

      <div className="relative">
        {/* Fading shadows on both ends */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-[320px] bg-gradient-to-r from-grey-98 to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[320px] bg-gradient-to-l from-grey-98 to-transparent z-10" />

        {/* Scrolling container */}
        <div
          className="flex hover:[animation-play-state:paused]"
          style={{
            animation: "marquee 25s linear infinite",
          }}
        >
          {/* Repeat logos 3 times for seamless effect */}
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-12 mx-6 min-w-max">
              {logos.map((logo, i) => (
                <div key={`${idx}-${i}`} className="flex-shrink-0">
                  <Image
                    src={logo}
                    alt="logo"
                    width={120}
                    height={40}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
