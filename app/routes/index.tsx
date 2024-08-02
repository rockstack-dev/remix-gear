import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { getTranslations } from "~/locale/i18next.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.metatags ?? [];

type LoaderData = {
  metatags: [{ title: string }];
};
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { t } = await getTranslations(request);
  const data: LoaderData = {
    metatags: [{ title: "Remix Gear" }],
  };
  return json(data);
};

export default function () {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Remix Gear</h1>
      <div className="">
        Cleanest way to start a{" "}
        <Link to="https://remix.run/" className="font-medium hover:underline">
          Remix
        </Link>{" "}
        project with{" "}
        <Link to="https://tailwindcss.com/" className="font-medium hover:underline">
          Tailwind CSS
        </Link>
        ,{" "}
        <Link to="https://ui.shadcn.com/" className="font-medium hover:underline">
          shadcn/ui
        </Link>
        , and{" "}
        <Link to="https://github.com/sergiodxa/remix-i18next" className="font-medium hover:underline">
          Tailwind CSS
        </Link>
        .
      </div>
    </div>
  );
}
