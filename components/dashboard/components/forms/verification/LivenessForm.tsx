"use client";

import { PrimaryButton } from "@/components/ui";
import React, { useState } from "react";

export default function LivenessPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleStart() {
    setError(null);
    setLoading(true);

    try {
      // ✅ 1. Ask backend for dynamic Dojah config (with logged-in user ID)
      const res = await fetch("/api/dojah-config", { credentials: "include" });
      if (!res.ok) throw new Error("Please log in first or try again later.");

      const cfg = await res.json();

      // ✅ 2. If backend gives a redirect/launch URL (some flows do)
      if (cfg.launchUrl) {
        window.open(cfg.launchUrl, "_blank", "noopener");
        setLoading(false);
        return;
      }

      // ✅ 3. Load Dojah SDK dynamically
      if (!document.querySelector(`script[src="${cfg.scriptUrl}"]`)) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = cfg.scriptUrl;
          s.async = true;
          s.onload = () => resolve();
          s.onerror = () =>
            reject(new Error("Failed to load verification SDK"));
          document.body.appendChild(s);
        });
      }

      // ✅ 4. Initialize Dojah Connect widget
      const win: any = window;
      const Connect = win.Connect;
      if (!Connect) throw new Error("Dojah SDK not available after load");

      const instance = new Connect({
        ...cfg.options,
        onSuccess: (res: any) => {
          console.log("✅ Verification Success:", res);
          alert("✅ Verification complete!");
        },
        onError: (err: any) => {
          console.error("❌ Verification Error:", err);
          alert("Verification failed. Please try again.");
        },
        onClose: () => console.log("Widget closed"),
      });

      instance.setup();
      instance.open();
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Failed to start verification");
    } finally {
      setLoading(false);
    }
  }

  // ✅ 5. UI stays *exactly* as you provided
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <div className=" mb-6">
            <h2 className="text-2xl text-center font-semibold text-gray-900">
              Liveness Verification
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              We need to verify that you're a real person. This helps protect
              your account from fraud.
            </p>

            <div className="flex items-center justify-center mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-primary flex items-center justify-center mx-auto">
                <div className="w-full h-full bg-[#EEECFB] text-[#EEECFB] rounded-full flex items-center justify-center text-2xl">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.7261 2.14459C18.7691 2.14461 18.8126 2.14464 18.8566 2.14464C18.9007 2.14464 18.9442 2.14461 18.9871 2.14459C19.6649 2.14414 20.2086 2.14378 20.7025 2.25745C21.8394 2.51911 22.8414 3.22816 23.4005 4.25605C23.6448 4.70512 23.7649 5.22692 23.8989 5.80973C23.9087 5.85207 23.9185 5.89473 23.9284 5.9377L24.0712 6.55505C24.0758 6.57496 24.0804 6.59481 24.085 6.61461C24.2191 7.19388 24.3419 7.72467 24.3957 8.17002C24.4535 8.6482 24.4574 9.20073 24.207 9.75277C23.9511 10.3169 23.5254 10.7778 23.0057 11.0935C22.5169 11.3903 21.9871 11.4883 21.4921 11.5317C21.0176 11.5733 20.4334 11.5732 19.7642 11.5732H17.9491C17.2798 11.5732 16.6956 11.5733 16.2211 11.5317C15.7261 11.4883 15.1963 11.3903 14.7075 11.0935C14.1879 10.7778 13.7622 10.3169 13.5063 9.75277C13.2558 9.20073 13.2598 8.6482 13.3176 8.17002C13.3714 7.72467 13.4942 7.19388 13.6282 6.6146C13.6328 6.59481 13.6374 6.57496 13.642 6.55505L13.7848 5.9377C13.7948 5.89472 13.8046 5.85206 13.8143 5.80972C13.9484 5.22692 14.0684 4.70512 14.3127 4.25605C14.8718 3.22816 15.8739 2.51911 17.0107 2.25745C17.5046 2.14378 18.0483 2.14414 18.7261 2.14459ZM18.8566 4.71607C17.9829 4.71607 17.7579 4.72414 17.5875 4.76337C17.1038 4.87468 16.7483 5.15983 16.5716 5.48479C16.5177 5.58383 16.4723 5.72956 16.2901 6.51719L16.1473 7.13454C15.9949 7.79326 15.9056 8.18719 15.8704 8.47848C15.8542 8.61308 15.8558 8.68276 15.8581 8.71085C15.8901 8.77054 15.9481 8.83838 16.0424 8.89563L16.0447 8.89686C16.0464 8.89773 16.0496 8.89925 16.0546 8.90131C16.0647 8.90543 16.0833 8.9122 16.1138 8.92018C16.1779 8.93698 16.2803 8.95559 16.4456 8.97007C16.7942 9.00062 17.2641 9.00179 18.0027 9.00179H19.7105C20.4491 9.00179 20.9191 9.00062 21.2677 8.97007C21.4329 8.95559 21.5354 8.93698 21.5995 8.92018C21.6299 8.9122 21.6486 8.90543 21.6586 8.90131C21.6637 8.89925 21.6669 8.89773 21.6686 8.89686L21.6704 8.89592C21.7647 8.83866 21.8232 8.77054 21.8552 8.71085C21.8574 8.68276 21.8591 8.61308 21.8428 8.47848C21.8076 8.18719 21.7183 7.79326 21.5659 7.13454L21.4231 6.51719C21.241 5.72956 21.1956 5.58383 21.1417 5.48479C20.9649 5.15983 20.6094 4.87468 20.1258 4.76337C19.9553 4.72414 19.7304 4.71607 18.8566 4.71607ZM21.8532 8.72614C21.8532 8.72608 21.8534 8.72481 21.8539 8.72251ZM15.86 8.72614C15.86 8.72619 15.8597 8.72504 15.8593 8.72251Z"
                      fill="#5741D8"
                    />
                    <path
                      d="M30 22.7168C34.497 22.7169 38.1424 26.3624 38.1426 30.8594C38.1426 35.3565 34.4971 39.0029 30 39.0029C25.5028 39.0029 21.8574 35.3566 21.8574 30.8594C21.8576 26.3623 25.5029 22.7168 30 22.7168ZM33.4219 28.7217C33.0853 28.0967 32.3058 27.8629 31.6807 28.1992C30.5529 28.8063 29.5868 30.0857 29.0195 30.9443C28.8314 30.7939 28.5172 30.5742 28.2715 30.457C27.6306 30.1515 26.8633 30.4227 26.5576 31.0635C26.2547 31.6984 26.5193 32.4573 27.1475 32.7686C27.15 32.7701 27.3253 32.8815 27.4258 32.9629C27.6287 33.1272 27.9 33.3954 28.1348 33.7939C28.3759 34.2029 28.8226 34.446 29.2969 34.4258C29.771 34.4054 30.196 34.1241 30.4014 33.6963C30.4378 33.6245 30.5434 33.4179 30.6152 33.2861C30.7597 33.0213 30.9676 32.6605 31.2207 32.2773C31.7653 31.4531 32.3793 30.7439 32.8994 30.4639C33.5246 30.1273 33.7585 29.3469 33.4219 28.7217Z"
                      fill="#5741D8"
                    />
                    <path
                      d="M23.1475 5.57031C25.4005 5.57871 27.2422 5.62086 28.7295 5.86816C30.2483 6.12074 31.521 6.60572 32.5557 7.58594C33.7249 8.69367 34.2407 10.1012 34.4824 11.8047C34.7149 13.4429 34.7149 15.5281 34.7148 18.123V21.2295C33.2922 20.5313 31.6916 20.1396 30 20.1396C27.2795 20.1397 24.7968 21.1546 22.9072 22.8252C23.2672 22.1523 23.4717 21.3827 23.4717 20.5703C23.4715 17.9994 21.4334 15.8564 18.8477 15.8564C16.2619 15.8564 14.2238 17.9994 14.2236 20.5703C14.2236 23.1413 16.2618 25.2852 18.8477 25.2852C19.7734 25.2852 20.6288 25.0098 21.3457 24.5391C20.7847 25.3067 20.3232 26.1512 19.9805 27.0547C17.2291 26.7588 14.3612 27.6361 12.3135 29.5801C11.8021 30.0656 11.5732 30.7209 11.5732 31.3398C11.5734 32.7296 12.7 33.8564 14.0898 33.8564H19.7129C20.303 35.8817 21.4744 37.6597 23.0352 38.9961C22.5502 38.9976 22.0449 38.9971 21.5195 38.9971H16.1943C13.4435 38.9971 11.2551 38.9967 9.54004 38.7783C7.7758 38.5536 6.31871 38.078 5.15918 36.9795C3.98993 35.8717 3.47418 34.4643 3.23242 32.7607C2.99994 31.1225 2.99996 29.0373 3 26.4424V18.123C2.99996 15.5281 2.99993 13.4429 3.23242 11.8047C3.4742 10.1012 3.9899 8.69368 5.15918 7.58594C6.1939 6.60569 7.46649 6.12073 8.98535 5.86816C10.4725 5.62087 12.3136 5.57871 14.5664 5.57031C15.2765 5.56767 15.8548 6.14149 15.8574 6.85156L14.5762 9.93848H23.1387L21.8574 6.85156C21.8601 6.1416 22.4375 5.56785 23.1475 5.57031ZM19.3818 29.4336C19.3853 29.4072 19.3879 29.3808 19.3916 29.3545C19.3879 29.3808 19.3853 29.4072 19.3818 29.4336ZM19.4502 28.9893C19.4593 28.9377 19.4687 28.8863 19.4785 28.835C19.4687 28.8863 19.4592 28.9377 19.4502 28.9893ZM19.5479 28.499C19.558 28.4537 19.5683 28.4084 19.5791 28.3633C19.5684 28.4084 19.558 28.4537 19.5479 28.499ZM19.6729 27.999C19.682 27.9657 19.6917 27.9326 19.7012 27.8994C19.6917 27.9326 19.682 27.9657 19.6729 27.999ZM19.8125 27.5322C19.8215 27.5047 19.8316 27.4776 19.8408 27.4502C19.8316 27.4776 19.8215 27.5047 19.8125 27.5322Z"
                      fill="#5741D8"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="text-left max-w-lg mx-auto mb-6">
              <h3 className="font-medium   mb-2 text-center text-gray-900">
                Before we start:
              </h3>
              <ul className="list-disc m-6 list-inside text-sm text-gray-600 space-y-1">
                <li>Make sure you're in a well-lit area</li>
                <li>Remove hats, sunglasses, or masks</li>
                <li>Look directly at the camera</li>
                <li>Follow the on-screen instructions</li>
              </ul>
            </div>

            <div className="flex items-start rounded-xl  gap-3 mb-6 max-w-xl mx-auto p-2 border border-[#EAEBF0]">
              <div className="p-2  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M7.98486 0.834961C9.31419 0.811402 10.3097 1.3704 11.1919 1.86621L11.2202 1.88184C12.1285 2.3922 12.9294 2.83496 14.0054 2.83496C14.242 2.83505 14.4462 3.0008 14.4946 3.23242C15.1687 6.4558 14.8071 9.13617 13.6343 11.1748C12.4593 13.2169 10.5038 14.5556 8.11084 15.1523C8.03558 15.1711 7.95706 15.1721 7.88135 15.1553C5.6452 14.656 3.68786 13.3603 2.47021 11.3232C1.25278 9.28631 0.802436 6.55629 1.48389 3.23438C1.53415 2.98935 1.75779 2.81913 2.00732 2.83594C2.9439 2.8996 3.71573 2.48429 4.65869 1.95508C4.67544 1.94568 4.69262 1.93622 4.70947 1.92676C5.60731 1.4226 6.65173 0.836441 7.98486 0.834961ZM11.0923 4.82227C10.8094 4.58656 10.3885 4.62438 10.1528 4.90723L7.2876 8.34668L6.13721 7.19629C5.87686 6.93594 5.4542 6.93594 5.19385 7.19629C4.93373 7.45662 4.93368 7.87838 5.19385 8.13867L6.86084 9.80566C6.99317 9.93788 7.17494 10.0084 7.36182 10C7.54893 9.99151 7.72433 9.90464 7.84424 9.76074L11.1772 5.76074C11.4129 5.47798 11.3749 5.05801 11.0923 4.82227Z"
                    fill="#252525"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-700 ">
                <div className="font-medium">Privacy & Security</div>
                Your video and images are encrypted and stored securely. We use
                industry-standard security measures to protect your information.
              </div>
            </div>

            {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

            <div className="flex justify-center">
              <PrimaryButton
                onClick={handleStart}
                disabled={loading}
                variant="solidRounded"
                size="lg"
              >
                {loading ? "Starting…" : "Start Verification"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
