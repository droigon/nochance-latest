import { ArrowRight } from "lucide-react";
import PrimaryButton from "../ui/PrimaryButton";

export default function BusinessCTA() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto bg-purple-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h3
            className="mb-2"
            style={{
              color: "#121511",
              fontFamily: "var(--font-family-Title, Onest)",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "22px",
            }}
          >
            Looking to grow your business?
          </h3>

          <p
            style={{
              color: "#121511",
              fontFamily: "var(--font-family-Title, Onest)",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            Grow your reputation with verified reviews on Nochance.
          </p>
        </div>

        {/* CTA Button */}
        <PrimaryButton variant="gradient" size="lg">
          About Us <ArrowRight size={18} className="ml-2" />
        </PrimaryButton>
      </div>
    </section>
  );
}
