import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ua", "pl", "de", "es", "ru"],
  defaultLocale: "en",
});