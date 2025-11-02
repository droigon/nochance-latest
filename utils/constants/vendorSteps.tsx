export type StepId =
  | "personal"
  | "business"
  | "bank"
  | "social"
  | "identity"
  | "bank"
  | "liveness"
  | "cac"
  | "phone";

export type Step = {
  id: string;
  title: string;
  desc: string;
  required?: boolean;
  route: string;
  icon?: React.ReactNode;
};

export const steps: Step[] = [
  {
    id: "personal",
    title: "Personal ",
    desc: "Provide your full name, email, phone number, and date of birth to set up your profile.",
    required: true,
    route: "/dashboard/vendor/verifications/personal",
    icon: (
      <svg
        className="w-6 h-6 text-blue-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12a5 5 0 100-10 5 5 0 000 10zM4 20a8 8 0 0116 0"
        />
      </svg>
    ),
  },
  {
    id: "business",
    title: "Business Information",
    desc: "Provide your business name, registration number, and address.",
    required: true,
    route: "/dashboard/vendor/verifications/business",
    icon: (
      <svg
        className="w-6 h-6 text-green-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 10v7M17 10v7M5 20h14"
        />
      </svg>
    ),
  },
  {
    id: "social",
    title: "Social Media Handles",
    desc: "Add your key social accounts (Instagram, X/Twitter, TikTok, YouTube, etc.)",
    required: true,
    route: "/dashboard/vendor/verifications/social",
    icon: (
      <svg
        className="w-6 h-6 text-pink-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 12v7a1 1 0 01-1 1H3a1 1 0 01-1-1v-7"
        />
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 10l5 5 5-5"
        />
      </svg>
    ),
  },
  {
    id: "identity",
    title: "Identity Verification",
    desc: "Enter your NIN and BVN to confirm your identity and prevent fraud.",
    required: true,
    route: "/dashboard/vendor/verifications/identity",
    icon: (
      <svg
        className="w-6 h-6 text-yellow-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4z"
        />
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2"
        />
      </svg>
    ),
  },
  {
    id: "bank",
    title: "Bank Account Details",
    desc: "Provide your 10-digit bank account number. We'll verify it automatically.",
    required: true,
    route: "/dashboard/vendor/verifications/bank-account",
    icon: (
      <svg
        className="w-6 h-6 text-green-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 10v7M17 10v7M5 20h14"
        />
      </svg>
    ),
  },
  {
    id: "liveness",
    title: "Liveness Verification",
    desc: "Complete a quick selfie check to confirm you're the real person behind this account.",
    required: false,
    route: "/dashboard/vendor/verifications/liveness",
    icon: (
      <svg
        className="w-6 h-6 text-purple-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2l3 7h7l-5 4 2 7-7-4-7 4 2-7-5-4h7z"
        />
      </svg>
    ),
  },
];
