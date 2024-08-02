import { resolve } from "node:path";
import { createCookie } from "@remix-run/node";

import { RemixI18Next } from "remix-i18next";
import { i18nConfig } from "./i18n";

import Backend from "i18next-fs-backend";
import path from "path";

export const i18nCookie = createCookie("_i18n", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 30,
  secrets: [process.env.SESSION_SECRET || "SESSION_SECRET"],
  secure: process.env.NODE_ENV === "production",
});

export const remixI18Next = new RemixI18Next({
  detection: {
    // The cookie used to store user's language preference.
    cookie: i18nCookie,
    // The supported languages.
    supportedLanguages: i18nConfig.supportedLngs,
    // The fallback language.
    fallbackLanguage: i18nConfig.fallbackLng,
  },

  // The i18next configuration used when translating
  // Server-Side only messages.
  i18next: {
    ...i18nConfig,
    backend: {
      localePath: path.resolve("./public/locales"),
      loadPath:
        // process.env.VERCEL_URL ? resolve("./locales/{{lng}}/{{ns}}.json") :
        resolve("./public/locales/{{lng}}/{{ns}}.json"),
    },
  },

  // The plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system.
  plugins: [Backend],
});

export async function getTranslations(request: Request, namespace = "translations") {
  const t = await remixI18Next.getFixedT(request, namespace);
  let translations: any = {};
  const locale = await remixI18Next.getLocale(request);
  return { t, translations, locale };
}
