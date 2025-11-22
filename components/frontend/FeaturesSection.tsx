import { ArrowRight } from "lucide-react";
import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

// Inline SVG components converted to JSX
const IconShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden
  >
    <path
      opacity="0.4"
      d="M23.7463 4.46457L11.8296 8.9279C9.55459 9.79457 7.69125 12.4812 7.69125 14.9296V32.4796C7.69125 34.2346 8.83959 36.5529 10.2479 37.5929L22.1646 46.4979C24.2663 48.0796 27.7113 48.0796 29.8129 46.4979L41.7296 37.5929C43.1379 36.5312 44.2863 34.2346 44.2863 32.4796V14.9296C44.2863 12.5029 42.4229 9.79457 40.1479 8.94957L28.2313 4.48623C27.0179 4.00957 24.9813 4.00957 23.7463 4.46457Z"
      fill="white"
      fillOpacity="0.8"
    />
    <path
      d="M23.0972 30.8298C22.6855 30.8298 22.2738 30.6781 21.9488 30.3531L18.4605 26.8648C17.8322 26.2365 17.8322 25.1965 18.4605 24.5681C19.0888 23.9398 20.1288 23.9398 20.7572 24.5681L23.0972 26.9081L31.2655 18.7398C31.8938 18.1115 32.9338 18.1115 33.5622 18.7398C34.1905 19.3681 34.1905 20.4081 33.5622 21.0365L24.2455 30.3531C23.9205 30.6781 23.5088 30.8298 23.0972 30.8298Z"
      fill="white"
      fillOpacity="0.8"
    />
  </svg>
);

const IconStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    aria-hidden
  >
    <path
      opacity="0.4"
      d="M12.4364 34.6667C12.6747 33.605 12.2414 32.0883 11.483 31.33L6.21803 26.065C4.57136 24.4183 3.92136 22.6633 4.39803 21.1467C4.89636 19.63 6.4347 18.59 8.73136 18.2L15.4914 17.0733C16.4664 16.9 17.658 16.0333 18.113 15.145L21.8397 7.67001C22.923 5.52501 24.3964 4.33334 25.9997 4.33334C27.603 4.33334 29.0764 5.52501 30.1597 7.67001L33.8864 15.145C34.168 15.7083 34.753 16.25 35.3814 16.6183L12.0464 39.9533C11.743 40.2567 11.223 39.975 11.3097 39.5417L12.4364 34.6667Z"
      fill="white"
      fillOpacity="0.8"
    />
    <path
      d="M40.5162 31.3298C39.7362 32.1098 39.3029 33.6048 39.5629 34.6664L41.0579 41.1881C41.6862 43.8964 41.2962 45.9331 39.9529 46.9081C39.4112 47.2981 38.7612 47.4931 38.0029 47.4931C36.8979 47.4931 35.5979 47.0814 34.1679 46.2364L27.8196 42.4664C26.8229 41.8814 25.1762 41.8814 24.1796 42.4664L17.8312 46.2364C15.4262 47.6448 13.3679 47.8831 12.0462 46.9081C11.5479 46.5398 11.1796 46.0414 10.9412 45.3914L37.2879 19.0448C38.2846 18.0481 39.6929 17.5931 41.0579 17.8314L43.2462 18.1998C45.5429 18.5898 47.0812 19.6298 47.5796 21.1464C48.0562 22.6631 47.4062 24.4181 45.7596 26.0648L40.5162 31.3298Z"
      fill="white"
      fillOpacity="0.8"
    />
  </svg>
);

const IconBell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="44"
    viewBox="0 0 39 44"
    fill="none"
    aria-hidden
  >
    <path
      d="M1.08335 39C1.68166 39 2.16668 38.515 2.16668 37.9167V26C2.16668 22.8511 2.96113 19.9333 4.55001 17.2467C6.08113 14.6467 8.14668 12.5811 10.7467 11.05C13.4333 9.46112 16.3511 8.66668 19.5 8.66668C22.6489 8.66668 25.5667 9.46112 28.2533 11.05C30.8533 12.5811 32.9189 14.6467 34.45 17.2467C36.0389 19.9333 36.8333 22.8511 36.8333 26V37.9167C36.8333 38.515 37.3184 39 37.9167 39C38.515 39 39 39.485 39 40.0833V41.3333C39 42.4379 38.1046 43.3333 37 43.3333H2.00001C0.895445 43.3333 1.42455e-05 42.4379 1.42455e-05 41.3333V40.0833C1.42455e-05 39.485 0.485039 39 1.08335 39ZM6.64895 24.0074C6.48238 25.0994 7.39544 26 8.50001 26H8.83335C9.93792 26 10.8059 25.0925 11.0577 24.0171C11.2497 23.1971 11.5649 22.4136 12.0033 21.6667C12.7833 20.3378 13.8378 19.2833 15.1667 18.5033C15.9136 18.0649 16.6971 17.7497 17.5171 17.5577  C18.5926 17.3059 19.5 16.4379 19.5 15.3333V15C19.5 13.8954 18.5994 12.9824 17.5074 13.149C15.9103 13.3926 14.3934 13.9352 12.9567 14.7767C10.9922 15.9322 9.43224 17.4922 8.27668 19.4567C7.43518 20.8934 6.8926 22.4103 6.64895 24.0074ZM17.3333 2.00001C17.3333 0.895439 18.2288 1.14441e-05 19.3333 1.14441e-05H19.6667C20.7713 1.14441e-05 21.6667 0.895443 21.6667 2.00001V4.50001C21.6667 5.60458 20.7712 6.50001 19.6667 6.50001H19.3333C18.2288 6.50001 17.3333 5.60458 17.3333 4.50001V2.00001ZM34.9425 7.48089C35.7235 6.69984 36.9898 6.69984 37.7709 7.48089L38.0191 7.72913C38.8002 8.51018 38.8002 9.77651 38.0191 10.5576L36.2542 12.3225C35.4732 13.1035 34.2068 13.1035 33.4258 12.3225L33.1776 12.0742C32.3965 11.2932 32.3965 10.0268 33.1776 9.2458L34.9425 7.48089ZM0.980894 10.5576C0.199846 9.77651 0.199846 8.51018 0.980895 7.72913L1.22913 7.48089C2.01018 6.69984 3.27651 6.69984 4.05756 7.48089L5.82247 9.2458C6.60352 10.0268 6.60352 11.2932 5.82247 12.0742L5.57423 12.3225C4.79318 13.1035 3.52685 13.1035 2.7458 12.3225L0.980894 10.5576Z"
      fill="white"
      fillOpacity="0.8"
    />
  </svg>
);

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Verified Seller Badges",
      description:
        "Connect your apps easily with user-friendly solutions that boost functionality and simplify your workflows.",
      icon: IconShield,
      bgColor: "bg-blue-gradient-180",
      iconColor: "text-white",
      iconBg: "bg-blue-500",
      learnMoreColor: "text-purple-600",
    },
    {
      id: 2,
      title: "Buyer Reviews",
      description:
        "Ratings can include screenshots or payment evidence. Real reviews from verified purchases with optional proof attachments.",
      icon: IconStar,
      bgColor: "bg-azure-gradient-180",
      iconColor: "text-white",
      iconBg: "bg-azure-45",
      learnMoreColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Fraud Reporting",
      description:
        "Easy scam flagging with 48-hour admin follow-up. Quick response team ensures rapid resolution of reported issues.",
      icon: IconBell,
      bgColor: "bg-green-100",
      iconColor: "text-white",
      iconBg: "bg-spring-green-41",
      learnMoreColor: "text-green-600",
    },
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="text-xs sm:text-sm font-semibold text-grey-24 mb-3 sm:mb-4 uppercase tracking-wider">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-grey-24 mb-4 sm:mb-6">
            Safer Shopping.
            <br />
            Smarter Protections
          </h2>
          <p className="text-grey-40 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Advanced verification, transparent reviews, and rapid fraud response
            keep you protected while shopping.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`${feature.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${feature.iconBg} flex items-center justify-center mb-4 sm:mb-6 rounded-lg`}
              >
                {/* inline SVG component already defines its own sizing/colors */}
                <feature.icon />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium leading-7 sm:leading-8 md:leading-9 text-grey-24 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-grey-40 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <button
                className={`text-grey-24 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200 text-xs sm:text-sm md:text-base`}
              >
                Learn more <ArrowRight className="text-violet-50" size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <PrimaryButton className="btn-gradient font-semibold flex items-center gap-2 sm:gap-[10px] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm md:text-base">
            See More <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
