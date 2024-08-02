import { MouseEventHandler, ReactNode } from "react";
import LinkOrAhref from "./LinkOrAhref";
import { Button } from "../button";
import clsx from "clsx";

interface Props {
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  to?: string;
  target?: undefined | "_blank";
  rel?: string;
  disabled?: boolean;
  destructive?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  prefetch?: "intent" | "render" | "none";
  reloadDocument?: boolean;
}

export default function ButtonSecondary({
  className = "",
  type = "button",
  onClick,
  disabled,
  destructive,
  to,
  target,
  rel,
  children,
  isLoading,
  prefetch,
  reloadDocument,
}: Props) {
  return (
    <span>
      {(() => {
        if (!to || disabled) {
          return (
            <Button
              variant={destructive ? "destructive" : "secondary"}
              onClick={onClick}
              type={type}
              disabled={disabled || isLoading}
              className={clsx("inline-flex items-center space-x-2", className)}
              // className={clsx(
              //   isLoading && "base-spinner cursor-not-allowed",
              //   className,
              //   "focus:border-accent-300 inline-flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2",
              //   disabled ? "cursor-not-allowed bg-gray-100 opacity-75" : "bg-white",
              //   !destructive && "text-accent-700",
              //   destructive && "text-red-700",
              //   !disabled && !destructive && !className && "hover:border-accent-300 hover:text-accent-900 focus:ring-accent-500 hover:bg-gray-50",
              //   !disabled && destructive && "hover:bg-red-50 focus:ring-red-500"
              // )}
            >
              {children}
            </Button>
          );
        } else {
          return (
            <Button asChild variant="secondary">
              <LinkOrAhref
                to={to}
                target={target}
                rel={rel}
                prefetch={prefetch}
                reloadDocument={reloadDocument}
                className={clsx("inline-flex items-center space-x-2", className)}
                // className={clsx(
                //   isLoading && "base-spinner cursor-not-allowed",
                //   className,
                //   "focus:border-accent-300 inline-flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2",
                //   disabled ? "cursor-not-allowed bg-gray-100 opacity-75" : "bg-white",
                //   !destructive && "text-accent-700",
                //   destructive && "text-red-700",
                //   !disabled && !destructive && !className && "hover:border-accent-300 hover:text-accent-900 focus:ring-accent-500 hover:bg-gray-50",
                //   !disabled && destructive && "hover:bg-red-50 focus:ring-red-500"
                // )}
              >
                {children}
              </LinkOrAhref>
            </Button>
          );
        }
      })()}
    </span>
  );
}
