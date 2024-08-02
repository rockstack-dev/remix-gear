import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import ButtonSecondary from "~/components/ui/buttons/ButtonSecondary";
import DarkModeToggle from "~/components/ui/selectors/DarkModeToggle";
import LocaleSelector from "~/components/ui/selectors/LocaleSelector";
import ThemeSelector from "~/components/ui/selectors/ThemeSelector";
import YouTubeIcon from "~/components/ui/YouTubeIcon";
import { getTranslations } from "~/locale/i18next.server";

const GITHUB_URL = "https://github.com/rockstack-dev/remix-gear.git";
const YOUTUBE_URL = "https://www.youtube.com/@rockstack-dev";

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.metatags ?? [];

type LoaderData = {
  metatags: [{ title: string }];
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { t } = await getTranslations(request);
  const data: LoaderData = {
    metatags: [{ title: "Remix Gear" }],
  };
  return json(data);
};

export default function () {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 p-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-xl font-bold sm:text-3xl">Remix Gear 🦾</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link to={YOUTUBE_URL}>
                <YouTubeIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to={GITHUB_URL}>
                <GitHubLogoIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <LocaleSelector />
            <DarkModeToggle />
            <ThemeSelector />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            The cleanest way to start a{" "}
            <Link to="https://remix.run/" className="font-bold text-foreground hover:underline">
              Remix
            </Link>{" "}
            project with{" "}
            <Link to="https://tailwindcss.com/" className="font-bold text-foreground hover:underline">
              Tailwind CSS
            </Link>
            ,{" "}
            <Link to="https://ui.shadcn.com/" className="font-bold text-foreground hover:underline">
              shadcn/ui
            </Link>
            , and{" "}
            <Link to="https://github.com/sergiodxa/remix-i18next" className="font-bold text-foreground hover:underline">
              i18n
            </Link>
            .
          </div>
          <div>
            <pre className="relative truncate rounded-lg bg-secondary p-2 text-sm text-secondary-foreground">
              <button
                className="absolute right-1 top-1 rounded-lg bg-primary p-1 text-sm text-primary-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
                  toast.success("Copied to clipboard");
                }}
              >
                {t("copy")}
              </button>
              <code className="text-xs">git clone {GITHUB_URL}</code>
            </pre>
            <div className="mt-1 flex justify-end" style={{ fontSize: "0.5rem" }}>
              <Link to="https://saasrock.com" className="text-muted-foreground hover:underline" target="_blank">
                {t("sponsoredBy")} <span className="font-bold">SaasRock</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
