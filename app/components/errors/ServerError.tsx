import { useRouteError } from "@remix-run/react";
import Page404 from "~/components/ui/pages/Page404";
import Page401 from "~/components/ui/pages/Page401";

export default function ServerError() {
  const error: any = useRouteError();
  let errorTitle = error?.data?.message || error?.message || error?.data?.error || "Error";
  let errorDescription = error?.data?.description;
  let errorStack = error?.stack;

  if (error?.status === 404) {
    return <Page404 title={errorTitle} />;
  }
  if (error?.status === 401 || errorTitle === "Unauthorized") {
    return <Page401 />;
  }

  if (KNOWN_ERORS.hasOwnProperty(errorTitle)) {
    let knownError = KNOWN_ERORS[errorTitle];
    errorTitle = knownError.title;
    if (knownError.description !== undefined) {
      errorDescription = knownError.description;
    }
    if (knownError.stack !== undefined) {
      errorStack = knownError.stack;
    }
  }
  return (
    <div className="px-4 py-4">
      <div className="mx-auto w-full space-y-2 rounded-md border-2 border-dashed border-border bg-background p-12 text-center text-foreground shadow-md">
        <div className="flex flex-col justify-center space-y-1 break-words">
          <div className="mx-auto text-red-500">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div className="text-xl font-bold">{errorTitle}</div>
        </div>
        {errorDescription && <div className="">{errorDescription}</div>}
        {errorStack && (
          <div className="pt-4">
            <div className="break-words border-t border-dashed border-border pt-3 text-left text-sm text-muted-foreground">{errorStack}</div>
          </div>
        )}
      </div>
    </div>
  );
}

const KNOWN_ERORS: Record<string, { title: string; description?: string; stack?: string }> = {
  "Cannot read properties of null (reading 'useContext')": {
    title: "Compiling... reload in a few seconds.",
    description: "This error is usually temporary and should be resolved by reloading the page.",
  },
  "Cannot read properties of null (reading 'useRef')": {
    title: "Compiling... reload in a few seconds.",
    description: "This error is usually temporary and should be resolved by reloading the page.",
  },
  "Cannot read properties of null (reading 'useState')": {
    title: "Compiling... reload in a few seconds.",
    description: "This error is usually temporary and should be resolved by reloading the page.",
  },
};
