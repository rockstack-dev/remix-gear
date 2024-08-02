import { useNavigate } from "@remix-run/react";
import Logo from "~/components/brand/Logo";
import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
}
export default function Page404({ title }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="flex min-h-full flex-col pb-12 pt-16">
          <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-shrink-0 justify-center">
              <Logo />
            </div>
            <div className="py-16">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">404 error</p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title || "Page not found."}</h1>
                <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-4">
                  <button type="button" onClick={() => navigate(-1)} className="w-full text-center text-sm font-medium text-primary hover:text-primary/90">
                    <span aria-hidden="true"> &larr;</span> {t("shared.goBack")}
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
