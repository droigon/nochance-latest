import { ArrowRight } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function BusinessCTA() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto bg-purple-100 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h3
            className="mb-1 sm:mb-2 text-base sm:text-lg md:text-xl"
            style={{
              color: "#121511",
              fontFamily: "var(--font-family-Title, Onest)",
              fontWeight: 600,
              lineHeight: "1.4",
            }}
          >
            Looking to grow your business?
          </h3>

          <p
            className="text-xs sm:text-sm md:text-base leading-relaxed"
            style={{
              color: "#121511",
              fontFamily: "var(--font-family-Title, Onest)",
              fontWeight: 400,
            }}
          >
            Grow your reputation with verified reviews on Nochance.
          </p>
        </div>

        {/* CTA Button */}
        <PrimaryButton variant="gradient" size="lg" className="text-xs sm:text-sm md:text-base whitespace-nowrap">
          About Us <ArrowRight size={18} className="ml-1 sm:ml-2" />
        </PrimaryButton>
      </div>
    </section>
  );
}
