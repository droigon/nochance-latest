"use client";

import React, { useEffect } from "react";

const DojahPage = () => {
  useEffect(() => {
    // 1️⃣ Load the Dojah script once
    const script = document.createElement("script");
    script.src = "https://widget.dojah.io/widget.js";
    script.onload = () => {
      // 2️⃣ Wait until the script loads, then configure the widget
      const options = {
        app_id: "687a3de764b5a17442fe3d3c", // your app_id
        p_key: "prod_pk_fH8DbWPbiKfdWZexvi9L17nCK", // your public key
        type: "liveness", // or 'verification', 'custom', etc.

        metadata: {
          user_id: "121",
        },
        config: {
          widget_id: "", // optional: from Easy Onboard
        },
        onSuccess: function (response: any) {
          console.log("✅ Success:", response);
          alert("Verification successful!");
        },
        onError: function (err: any) {
          console.error("❌ Error:", err);
          alert("Verification failed.");
        },
        onClose: function () {
          console.log("Widget closed");
        },
      };

      // 3️⃣ Initialize the Dojah Connect widget
      // @ts-ignore - `Connect` is attached to window by the script
      const connect = new window.Connect(options);

      // Store for later use (optional)
      // @ts-ignore
      window.dojahConnect = connect;

      // 4️⃣ Hook up your button
      const btn = document.getElementById("dojah-button");
      if (btn) {
        btn.addEventListener("click", () => {
          connect.setup();
          connect.open();
        });
      }
    };
    document.body.appendChild(script);

    // 5️⃣ Cleanup when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Dojah Verification</h1>
      <button
        id="dojah-button"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Verification
      </button>
    </div>
  );
};

export default DojahPage;
