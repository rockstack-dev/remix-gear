import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useLocation } from "@remix-run/react";
import "./globals.css";
import "./themes.css";
import { createUserSession, getUserInfo } from "./utils/session.server";
import { useRootData } from "./utils/data/useRootData";
import { loadRootData } from "./utils/data/.server/rootData";
import clsx from "clsx";
import ServerError from "./components/errors/ServerError";
import { useTranslation } from "react-i18next";
import { Toaster as SonnerToaster } from "./components/ui/sonner";
import { useChangeLanguage } from "remix-i18next";

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.metatags ?? [];

export const handle = { i18n: "translations" };
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return loadRootData({ request, params });
};

function Document({ children, lang = "en", dir = "ltr" }: { children: React.ReactNode; lang?: string; dir?: string }) {
  const location = useLocation();
  const rootData = useRootData();

  return (
    <html
      lang={lang}
      dir={dir}
      className={["/app/", "/admin/"].some((p) => location.pathname.startsWith(p)) ? "" : rootData.theme.scheme === "dark" ? "dark" : ""}
    >
      <head>
        <Meta />

        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <Links />
      </head>

      <body className={clsx(`theme-${rootData.theme.color}`, "max-h-full min-h-screen max-w-full bg-background text-foreground")}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userInfo = await getUserInfo(request);
  const form = await request.formData();
  const action = form.get("action");
  const redirect = form.get("redirect")?.toString();
  if (action === "toggleScheme") {
    const current = userInfo.scheme;
    const scheme = current === "dark" ? "light" : "dark";
    return createUserSession(
      {
        ...userInfo,
        scheme,
      },
      redirect
    );
  } else if (action === "setTheme") {
    const theme = form.get("theme")?.toString();
    if (!theme) {
      return json({ error: "Invalid theme" });
    }
    return createUserSession({ ...userInfo, theme }, redirect);
  }
};

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const rootData = useRootData();
  useChangeLanguage(locale);
  return (
    <Document lang={locale} dir={i18n.dir()}>
      <Outlet />
      <SonnerToaster />
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document>
      <div className="mx-auto p-12 text-center">
        <ServerError />
      </div>
    </Document>
  );
}
