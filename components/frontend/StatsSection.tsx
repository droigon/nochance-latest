"use client";
import PrimaryButton from "../ui/PrimaryButton";
import Image from "next/image";

const stats = [
  {
    id: 1,
    value: "2.5 million+",
    label: "Verified Identities",
    icon: "elements-1.svg",
  },
  {
    id: 2,
    value: "340,000+",
    label: "Fraudulent Cases Detected",
    icon: "elements-2.svg",
  },
  { id: 3, value: "₦2.1B+", label: "Transactions secured", icon: "locked.svg" },
  {
    id: 4,
    value: "70,000+",
    label: "Businesses Onboarded",
    icon: "store-location-02.svg",
  },
  {
    id: 5,
    value: "520,000+",
    label: "Anonymous Reports Reviewed",
    icon: "elements.svg",
  },
  { id: 6, value: "99.3%", label: "System Accuracy", icon: "elements-2.svg" },
];

export default function StatsSection() {
  return (
    <section className="stats-hero text-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="stats-hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8">
          Join Thousands Protecting Nigeria's Business Community
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8">
          {stats.map((s) => (
            <div key={s.id} className="stat-item">
              <div className="mb-2 sm:mb-4 flex items-center justify-center">
                <Image
                  src={`/assets/icons/${s.icon}`}
                  alt={`${s.label} icon`}
                  width={40}
                  height={40}
                  className="block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{s.value}</div>
              <div className="stat-label text-xs sm:text-sm mt-1 sm:mt-2 opacity-90">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p className="max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-xs sm:text-sm opacity-90 mb-4 sm:mb-6 leading-relaxed">
          Create your free account to save reports, track your rating history,
          and get alerts about verified scams.
        </p>

        <PrimaryButton className="bg-white text-purple-700 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-xs sm:text-sm md:text-base">
          Create Free Account
        </PrimaryButton>

        <div className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-80 flex items-center justify-center gap-1 sm:gap-2">
          <Image
            src="/assets/icons/shield.svg"
            alt="Shield icon"
            width={32}
            height={31}
            className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
          />
          <span>Free • No Credit Card Required</span>
        </div>
      </div>
    </section>
  );
}
