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
    <section className="stats-hero text-white py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="stats-hero-title mb-8">
          Join Thousands Protecting Nigeria's Business Community
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-8">
          {stats.map((s) => (
            <div key={s.id} className="stat-item">
              <div className="mb-4 flex items-center justify-center">
                <Image
                  src={`/assets/icons/${s.icon}`}
                  alt={`${s.label} icon`}
                  width={40}
                  height={40}
                  className="block"
                />
              </div>
              <div className="text-4xl font-bold">{s.value}</div>
              <div className="stat-label text-sm mt-2 opacity-90">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p className="w-[554px] mx-auto text-sm opacity-90 mb-6">
          Create your free account to save reports, track your rating history,
          and get alerts about verified scams.
        </p>

        <PrimaryButton className="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold">
          Create Free Account
        </PrimaryButton>

        <div className="mt-6 text-sm opacity-80 flex items-center justify-center gap-2">
          <Image
            src="/assets/icons/shield.svg"
            alt="Shield icon"
            width={32}
            height={31}
            className="inline-block"
          />
          <span>Free • No Credit Card Required</span>
        </div>
      </div>
    </section>
  );
}
