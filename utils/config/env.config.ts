import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  DOJAH: {
    DOJAH_API_URL: process.env.DOJAH_API_URL || "https://api.dojah.io",
    DOJAH_APP_ID: process.env.DOJAH_APP_ID,
    DOJAH_PUBLIC_KEY: process.env.DOJAH_PUBLIC_KEY,
    DOJAH_WIDGET_ID: process.env.DOJAH_WIDGET_ID,
  },
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2000",
  URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  STRAPI: {
    API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337",
    API_TOKEN: process.env.STRAPI_API_TOKEN || "",
  },
};
