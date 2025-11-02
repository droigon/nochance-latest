import SearchBar from "./SearchBar";
import SubscribeForm from "./SubscribeForm";

export default function Hero() {
  return (
    <section
      className="relative text-center py-20"
      style={{
        background:
          "radial-gradient(132.34% 80% at 50% 100%, rgba(147, 51, 234, 0.2) 0%, rgba(255, 255, 255, 0.95) 100%), linear-gradient(to bottom, #faf5ff, #ffffff)",
      }}
    >
      <h1
        style={{
          color: "var(--color-grey-24, #3D3D3D)",
          textAlign: "center",
          fontFamily: "var(--font-family-Title, Onest)",
          fontSize: "var(--opacity-70, 70px)",
          fontStyle: "normal",
          fontWeight: "var(--font-weight-400, 400)",
          lineHeight: "var(--opacity-70, 70px)",
          letterSpacing: "var(--letter-spacing--2, -2px)",
        }}
        className="relative max-w-5xl mx-auto leading-none"
      >
        Verify vendors, avoid
        <br />
        scams, shop with
        <br />
        <span
          style={{
            position: "relative",
            display: "inline-block",
            color: "var(--color-violet-50, #6C01FF)",
            fontFamily: "var(--font-family-Title, Onest)",
            fontSize: "var(--opacity-70, 70px)",
            fontStyle: "normal",
            fontWeight: "var(--font-weight-400, 400)",
            lineHeight: "var(--opacity-70, 70px)",
            letterSpacing: "var(--letter-spacing--2, -2px)",
          }}
        >
          confidence
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 626 82"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -47%) scale(1.1)",
              width: "170%",
              height: "295%",
              stroke: "var(--color-violet-50, #6C01FF)",
              strokeWidth: "1.8",
              fill: "none",
              pointerEvents: "none",
            }}
          >
            <path d="M299.033 69.3393C110.152 69.3393 8.88658 48.6572 0.895569 38.1161C0.895569 17.5557 140.426 0.888275 312.545 0.888275C484.664 0.888275 624.194 17.5557 624.194 38.1161C622.8 46.7624 608.213 53.4608 601.093 55.7292M182.243 72.9796C255.678 81.0395 499.971 85.9917 559.25 69.3393" />
          </svg>
        </span>
      </h1>

      <p className="lead">
        Nigeria&apos;s trusted platform connecting buyers with verified sellers.
        Check trust scores, read reviews, and shop safely.
      </p>

      <div className="mt-8">
        <SearchBar />
      </div>

      {/* Floating Cards */}
      <div className="mt-16 flex justify-center gap-6">
        <div
          role="img"
          aria-label="Hero Card 1"
          className="relative w-40 h-40 rounded-lg rotate-[-6deg] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/image.png')]"
        />

        <div
          role="img"
          aria-label="Hero Card 2"
          className="relative w-40 h-40 rounded-lg rotate-[3deg] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/image-2.png')]"
        />

        <div
          role="img"
          aria-label="Hero Card 3"
          className="relative w-40 h-40 rounded-lg rotate-[6deg] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/image-3.png')]"
        />
      </div>
    </section>
  );
}
