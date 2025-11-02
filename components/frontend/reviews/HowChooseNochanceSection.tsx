"use client";

import { Search, Shield, CheckCircle } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  background: string;
  iconColor: string;
}

function FeatureCard({
  icon,
  background,
  iconColor,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      {/* Icon Container */}
      <div
        className={`mb-6 flex items-center justify-center w-16 h-16 rounded-full ${background}  ${iconColor} `}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function HowChooseNochanceSection() {
  const features = [
    {
      icon: <Search size={24} />,
      title: "Search",
      bg: "bg-blue-gradient-180",
      iconColor: "text-blue-500",
      description:
        "Use any business identifier to search our comprehensive database.",
    },
    {
      icon: <Shield size={24} />,
      title: "Verify",
      bg: "bg-green-100",
      iconColor: "text-spring-green-41",
      description:
        "Check verification status, trust scores, and community reviews.",
    },
    {
      icon: <CheckCircle size={24} />,
      title: "Contribute",
      bg: "bg-gradient-to-br from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
      description:
        "Add missing businesses, write reviews, or report suspicious activity.",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-3 font-bold text-gray-900 mb-3">
            Why Choose Nochance?
          </h2>
          <p className="lead text-gray-600 text-base md:text-lg">
            Our community-driven approach ensures transparency and trust
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              background={feature.bg}
              iconColor={feature.iconColor}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
