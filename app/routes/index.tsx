import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import DarkModeToggle from "~/components/ui/selectors/DarkModeToggle";
import LocaleSelector from "~/components/ui/selectors/LocaleSelector";
import ThemeSelector from "~/components/ui/selectors/ThemeSelector";
import YouTubeIcon from "~/components/ui/icons/YouTubeIcon";
import GitHubIcon from "~/components/ui/icons/GitHubIcon";
import TwitterIcon from "~/components/ui/icons/TwitterIcon";

const GITHUB_URL = "https://github.com/rockstack-dev/remix-gear.git";
const YOUTUBE_URL = "https://www.youtube.com/@rockstack-dev";
const TWITTER_URL = "https://twitter.com/AlexandroMtzG";

export default function () {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl space-y-6 p-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <h1 className="text-2xl font-bold sm:text-3xl">Remix Gear 🦾</h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="ghost" asChild size="sm">
              <Link to={YOUTUBE_URL}>
                <YouTubeIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to={GITHUB_URL}>
                <GitHubIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="sm">
              <Link to={TWITTER_URL}>
                <TwitterIcon className="h-5 w-5 text-muted-foreground" />
              </Link>
            </Button>
            <LocaleSelector />
            <DarkModeToggle />
            <ThemeSelector />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">
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
          <div className="space-y-2">
            <pre className="relative truncate rounded-lg bg-secondary p-2 text-secondary-foreground">
              <button
                className="absolute right-1 top-1 rounded-lg bg-primary p-1 text-primary-foreground"
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${GITHUB_URL}`);
                  toast.success("Copied to clipboard", {
                    position: "top-right",
                  });
                }}
              >
                {t("copy")}
              </button>
              <code className="text-sm">git clone {GITHUB_URL}</code>
            </pre>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 font-medium">
                <Link to="https://remix-gear.vercel.app/" className="hover:underline">
                  Remix
                </Link>
                <div>•</div>
                <Link to="https://nextjs-gear.vercel.app/" className="hover:underline">
                  Next.js
                </Link>
              </div>
              <Link to="https://saasrock.com/?ref=remix-gear" className="text-muted-foreground hover:underline">
                {t("by")} <span className="font-bold">SaasRock</span>
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-12">
            <h3 className="text-sm font-bold">Demos</h3>
            <div className="grid grid-cols-3 gap-4">
              <Link
                to="https://remix-gear-git-forms-alexandro-pro.vercel.app/forms"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">Form actions</div>
              </Link>
              <Link
                to="https://remix-gear-git-ai-structured-alexandro-pro.vercel.app/ai-structured-outputs"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">AI Structured Outputs</div>
              </Link>
              <Link
                to="https://remix-gear-git-whatsapp-api-alexandro-pro.vercel.app/whatsapp-api"
                className="h-12 rounded-md border border-border bg-background p-3 text-primary hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">WhatsApp API</div>
              </Link>
              <Link
                to="https://twitter.com/AlexandroMtzG"
                className="h-12 rounded-md border border-dashed border-border bg-background p-3 text-primary opacity-50 hover:bg-secondary/90 hover:text-secondary-foreground"
              >
                <div className="flex justify-center text-sm font-medium">Let me know!</div>
              </Link>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
              <div className="h-12 rounded-md border border-dashed border-border bg-secondary p-3 text-primary opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
