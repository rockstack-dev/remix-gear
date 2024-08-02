import { useLocation, useSearchParams, useSubmit } from "@remix-run/react";
import { Button } from "../button";
import clsx from "clsx";
import { useRootData } from "~/utils/data/useRootData";

interface Props {
  className?: string;
  disabled?: boolean;
}
export default function DarkModeToggle({ className, disabled }: Props) {
  const { userSession } = useRootData();
  let location = useLocation();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const toggle = async () => {
    const form = new FormData();
    form.set("action", "toggleScheme");
    form.set("redirect", location.pathname + "?" + searchParams.toString());
    submit(form, { method: "post", action: "/", preventScrollReset: true });
  };
  const isDarkMode = userSession?.scheme === "dark";

  return (
    <Button
      variant="ghost"
      type="button"
      size="sm"
      onClick={toggle}
      disabled={disabled}
      // className={clsx(
      //   className,
      //   "inline-flex items-center justify-center rounded-md px-2 py-1 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 dark:hover:bg-gray-600 dark:hover:text-gray-300",
      //   width
      // )}
    >
      <div>
        {isDarkMode ? (
          <svg
            className="h-5 w-5 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        )}
      </div>
    </Button>
  );
}
