import { json } from "@remix-run/node";
import { Params } from "@remix-run/react";
import { remixI18Next, i18nCookie } from "~/locale/i18next.server";
import { getUserInfo } from "~/utils/session.server";
import { getBaseURL, getDomainName } from "~/utils/url";
import { AppRootData } from "../useRootData";

export async function loadRootData({ request, params }: { request: Request; params: Params }) {
  const userInfo = await getUserInfo(request);
  const locale = await remixI18Next.getLocale(request);
  const data: AppRootData = {
    metatags: [{ title: "Remix Gear" }],
    locale,
    theme: {
      color: userInfo.theme,
      scheme: userInfo.scheme,
    },
    serverUrl: getBaseURL(request),
    domainName: getDomainName(request),
    userSession: userInfo,
  };

  const headers = new Headers();
  headers.append("Set-Cookie", await i18nCookie.serialize(locale));
  return json(data, {
    headers,
  });
}
