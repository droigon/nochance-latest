"use client";
import { ArrowRight, Star } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function WhySection() {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="text-sm font-semibold text-purple-600 mb-4 uppercase tracking-wider">
              Why Nochance
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Less Risk, More Trust
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nochance is on a mission to build Africa&apos;s most trusted
              marketplace — protecting buyers and empowering honest sellers.
            </p>

            <PrimaryButton className="btn-gradient px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
              About Us <ArrowRight size={18} />
            </PrimaryButton>

            {/* Trust Indicators */}
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-4">
                {/* Profile avatars */}
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <img
                      key={i}
                      src={`/assets/avatar/image-${i}.png`}
                      alt={`Avatar ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
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
                <p className="font-semibold text-gray-900">
                  Trusted by 20+ industries.
                </p>
                <p className="text-gray-600">
                  Verified marketplace expertise. Tailored for African growth
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image with Stats */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden relative h-96">
              {/* Background image from public folder */}
              <img
                src="/assets/about.png"
                alt="Nochance team"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Gradient overlay to ensure text contrast */}
              <div className="absolute inset-0 why-image-overlay" />

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-6 text-white">
                  <div>
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-sm font-semibold mb-2">
                      Customer Satisfaction
                    </div>
                    <div className="text-xs opacity-90">
                      Chosen by Nigeria&apos;s top sellers, protecting buyers
                      and powering growth with excellence.
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">$1B+</div>
                    <div className="text-sm font-semibold mb-2">
                      In Business Growth
                    </div>
                    <div className="text-xs opacity-90">
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
