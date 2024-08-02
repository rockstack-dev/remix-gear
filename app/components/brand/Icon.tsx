import clsx from "clsx";
import { Link } from "@remix-run/react";
import IconLight from "~/assets/img/icon-light.png";
import IconDark from "~/assets/img/icon-dark.png";

interface Props {
  className?: string;
  size?: string;
  fromConfig?: boolean;
}

export default function Icon({ className = "", size = "h-9", fromConfig = true }: Props) {
  return (
    <Link to="/" className={clsx(className, "flex")}>
      <img className={clsx(size, "hidden w-auto dark:block")} src={IconDark} alt="Logo" />
      <img className={clsx(size, "w-auto dark:hidden")} src={IconLight} alt="Logo" />
    </Link>
  );
}
