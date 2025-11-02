import { ArrowRight } from "lucide-react";
import StatsCard from "./StatsCard";
import PrimaryButton from "../ui/PrimaryButton";

export default function FooterCTA() {
  return (
    <section className="footer-cta">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center  gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h1
            style={{
              color: "var(--color-grey-97, #F7F7F7)",
              fontSize: "var(--opacity-70, 50px)",
              fontStyle: "normal",
              fontWeight: "var(--font-weight-400, 400)",
              lineHeight: "var(--opacity-70, 70px)",
              letterSpacing: "var(--letter-spacing--2, -2px)",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: "var(--opacity-70, 50px)",
                fontStyle: "normal",
                fontWeight: "var(--font-weight-400, 400)",
                lineHeight: "var(--opacity-70, 70px)",
                letterSpacing: "var(--letter-spacing--2, -2px)",
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
                  stroke: "#FFBF38", // ✅ updated color
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

          <p className="mt-6 text-md text-gray-200 max-w-md">
            Join thousands of satisfied buyers who trust Nochance for secure,
            transparent, and reliable online shopping across Nigeria.
          </p>

          <div className="mt-8 flex gap-4">
            <PrimaryButton variant="whiteRounded">
              Login or Sign up <ArrowRight size={18} />
            </PrimaryButton>
            <PrimaryButton variant="whiteRounded">Businesses</PrimaryButton>
          </div>
        </div>

        {/* Right Content (Card with Chart Placeholder) */}
        <div className=" w-full max-w-sm lg:max-w-md">
          <StatsCard />
        </div>
      </div>
    </section>
  );
}
