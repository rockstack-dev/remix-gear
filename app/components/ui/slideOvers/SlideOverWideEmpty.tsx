import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";
import XIcon from "../icons/XIcon";
import clsx from "clsx";

export default function SlideOverWideEmpty({
  title,
  description,
  open,
  children,
  onClose,
  className,
  buttons,
  withTitle = true,
  withClose = true,
  overflowYScroll,
  position = 1,
  size = "2xl",
}: {
  title?: string;
  description?: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
  buttons?: ReactNode;
  withTitle?: boolean;
  withClose?: boolean;
  overflowYScroll?: boolean;
  position?: 0 | 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div
          className={clsx(
            "fixed inset-0 overflow-hidden",
            position === 0 && "z-0",
            position === 1 && "z-10",
            position === 2 && "z-20",
            position === 3 && "z-30",
            position === 4 && "z-40",
            position === 5 && "z-50"
          )}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel
                  className={clsx(
                    "pointer-events-auto w-screen overflow-auto border border-border shadow-lg",
                    className,
                    size === "sm" && "max-w-sm",
                    size === "md" && "max-w-md",
                    size === "lg" && "max-w-lg",
                    size === "xl" && "max-w-xl",
                    size === "2xl" && "max-w-2xl",
                    size === "3xl" && "max-w-3xl",
                    size === "4xl" && "max-w-4xl",
                    size === "5xl" && "max-w-5xl",
                    size === "6xl" && "max-w-6xl",
                    size === "7xl" && "max-w-7xl",
                    size === "full" && "max-w-full"
                  )}
                >
                  <div className="flex h-full flex-col overflow-y-auto bg-background pt-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        {withTitle ? (
                          <div className="flex flex-col">
                            <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
                            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
                          </div>
                        ) : (
                          <div>
                            <button
                              type="button"
                              className="rounded-md text-muted-foreground outline-none hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <svg
                                className="h-6 w-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                              </svg>
                            </button>
                          </div>
                        )}

                        <div className="ml-3 flex h-7 items-center space-x-4">
                          {buttons}
                          {withClose && (
                            <button
                              type="button"
                              className="rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={clsx("relative mt-6 flex-1 border-t px-4 pb-6 pt-5 sm:px-6", overflowYScroll && "overflow-y-scroll")}>{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
