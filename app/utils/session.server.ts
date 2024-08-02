import { createCookieSessionStorage, redirect } from "@remix-run/node";

export type UserSession = {
  scheme: string;
  theme: string;
};

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RS_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserInfo(request: Request): Promise<UserSession> {
  const session = await getUserSession(request);
  const scheme = session.get("scheme") ?? "";
  const theme = session.get("theme");
  return {
    scheme,
    theme,
  };
}

export async function resetUserSession(request: Request) {
  const session = await getUserSession(request);
  session.set("scheme", undefined);
  session.set("lng", undefined);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function createUserSession(userSession: UserSession, redirectTo: string = "") {
  const session = await storage.getSession();
  session.set("scheme", userSession.scheme);
  session.set("theme", userSession.theme);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
