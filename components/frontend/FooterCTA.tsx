import { ArrowRight } from "lucide-react";
import StatsCard from "./StatsCard";
import PrimaryButton from "../ui/PrimaryButton";

export default function FooterCTA() {
  return (
    <section className="footer-cta">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h1
            style={{
              color: "var(--color-grey-97, #F7F7F7)",
              fontSize: "clamp(1.5rem, 8vw, 50px)",
              fontStyle: "normal",
              fontWeight: "var(--font-weight-400, 400)",
              lineHeight: "1.4",
              letterSpacing: "var(--letter-spacing--2, -2px)",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              Ready to Shop with
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 626 82"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -47%) scale(1.1)",
                  width: "90%",
                  height: "295%",
                  stroke: "#FFBF38",
                  strokeWidth: "1.8",
                  fill: "none",
                  pointerEvents: "none",
                }}
              >
                <path d="M299.033 69.3393C110.152 69.3393 8.88658 48.6572 0.895569 38.1161C0.895569 17.5557 140.426 0.888275 312.545 0.888275C484.664 0.888275 624.194 17.5557 624.194 38.1161C622.8 46.7624 608.213 53.4608 601.093 55.7292M182.243 72.9796C255.678 81.0395 499.971 85.9917 559.25 69.3393" />
              </svg>
            </span>
            <br />
            Complete Confidence?
          </h1>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-200 max-w-xs sm:max-w-md leading-relaxed">
            Join thousands of satisfied buyers who trust Nochance for secure,
            transparent, and reliable online shopping across Nigeria.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-4">
            <PrimaryButton variant="whiteRounded" className="text-xs sm:text-sm md:text-base">
              Login or Sign up <ArrowRight size={16} className="sm:size-[18px]" />
            </PrimaryButton>
            <PrimaryButton variant="whiteRounded" className="text-xs sm:text-sm md:text-base">Businesses</PrimaryButton>
          </div>
        </div>

        {/* Right Content (Card with Chart Placeholder) */}
        <div className="w-full sm:max-w-sm lg:max-w-md">
          <StatsCard />
        </div>
      </div>
    </section>
  );
}
