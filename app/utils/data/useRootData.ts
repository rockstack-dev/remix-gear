import { useMatches } from "@remix-run/react";
import { UserSession } from "../session.server";

export type AppRootData = {
  metatags: [{ title: string }];
  theme: { color: string; scheme: string };
  locale: string;
  serverUrl: string;
  domainName: string;
  userSession: UserSession;
};

export function useRootData(): AppRootData {
  return (useMatches().find((f) => f.pathname === "/" || f.pathname === "")?.data ?? {}) as AppRootData;
}
