"use client";
import { ArrowRight, Star } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function WhySection() {
  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="text-xs sm:text-sm font-semibold text-purple-600 mb-3 sm:mb-4 uppercase tracking-wider">
              Why Nochance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Less Risk, More Trust
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
              Nochance is on a mission to build Africa&apos;s most trusted
              marketplace — protecting buyers and empowering honest sellers.
            </p>

            <PrimaryButton className="btn-gradient px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base">
              About Us <ArrowRight size={16} sm-size={18} />
            </PrimaryButton>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                {/* Profile avatars */}
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <img
                      key={i}
                      src={`/assets/avatar/image-${i}.png`}
                      alt={`Avatar ${i}`}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-sm:border-2 border-white object-cover"
                      onError={(e) => {
                        // fallback: if image missing, replace with colored div
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                  Trusted by 20+ industries.
                </p>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Verified marketplace expertise. Tailored for African growth
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Stats */}
          <div className="relative">
            <div className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden relative h-64 sm:h-80 md:h-96">
              {/* Background image from public folder */}
              <img
                src="/assets/about.png"
                alt="Nochance team"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay to ensure text contrast */}
              <div className="absolute inset-0 why-image-overlay" />

              {/* Stats Overlay */}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 text-white">
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold">95%</div>
                    <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                      Customer Satisfaction
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-90 leading-tight">
                      Chosen by Nigeria&apos;s top sellers, protecting buyers
                      and powering growth with excellence.
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold">$1B+</div>
                    <div className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
                      In Business Growth
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-90 leading-tight">
                      Helping Nigerian sellers scale smart, sell safely, and
                      earn more.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
