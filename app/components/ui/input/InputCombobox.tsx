import { useRef, ReactNode, Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { Colors } from "~/lib/colors";
import clsx from "clsx";
import { Input } from "../input";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

interface Props {
  name?: string;
  title?: string;
  value?: (string | number)[];
  disabled?: boolean;
  options: { value: string | number | undefined; name?: string | ReactNode; color?: Colors; disabled?: boolean }[];
  onChange?: (value: (string | number)[]) => void;
  className?: string;
  withSearch?: boolean;
  withLabel?: boolean;
  required?: boolean;
  hint?: ReactNode;
  autoFocus?: boolean;
  readOnly?: boolean;
  minDisplayCount?: number;
}
export default function InputCombobox({
  name,
  title,
  value,
  options,
  disabled,
  onChange,
  className,
  withSearch = true,
  withLabel = true,
  required,
  autoFocus,
  readOnly,
  minDisplayCount = 3,
}: Props) {
  const { t } = useTranslation();

  const button = useRef<HTMLButtonElement>(null);
  const inputSearch = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<(string | number)[]>(value || []);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (value && !isEqual(selected.sort(), value?.sort())) {
      setSelected(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (onChange && !isEqual(selected.sort(), value?.sort())) {
      onChange(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  function isEqual(a: any, b: any) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const filteredItems = () => {
    if (!options) {
      return [];
    }
    return options.filter(
      (f) => f.name?.toString().toUpperCase().includes(searchInput.toUpperCase()) || f.value?.toString().toUpperCase().includes(searchInput.toUpperCase())
    );
  };

  function getSelectedOptions() {
    return options.filter((f) => selected.includes(f.value as string | number));
  }

  return (
    // @ts-ignore
    <Combobox multiple value={selected} onChange={setSelected} disabled={disabled || readOnly}>
      {({ open }) => (
        <div>
          {withLabel && title && (
            <Combobox.Label htmlFor={name} className="mb-1 flex justify-between space-x-2 text-xs font-medium">
              <div className="flex items-center space-x-1">
                <div className="truncate">
                  {title}
                  {required && <span className="ml-1 text-red-500">*</span>}
                </div>
              </div>
            </Combobox.Label>
          )}

          <div className="relative">
            <Combobox.Button
              autoFocus={autoFocus}
              type="button"
              ref={button}
              className={clsx(
                className,
                "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-left text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              )}
            >
              <div className="inline-flex w-full items-center space-x-2 truncate">
                <div className="truncate">
                  {selected.length > 0 ? (
                    <span className="truncate">
                      {getSelectedOptions().length < minDisplayCount
                        ? getSelectedOptions()
                            .map((f) => f.name ?? f.value)
                            .join(", ")
                        : getSelectedOptions().length + " selected"}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">{t("shared.select")}...</span>
                  )}
                </div>
              </div>
              <CaretSortIcon className="h-4 w-4 opacity-50" />
            </Combobox.Button>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Combobox.Options
                // onFocus={() => inputSearch.current?.focus()}
                onBlur={() => setSearchInput("")}
                className={clsx(
                  "absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-background py-1 text-base text-foreground shadow-lg focus:outline-none sm:text-sm"
                )}
              >
                {withSearch && (
                  <div className="flex rounded-md p-2">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <Input
                        ref={inputSearch}
                        id="search"
                        autoComplete="off"
                        placeholder={t("shared.searchDot")}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.currentTarget.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                )}

                {filteredItems().map((item, idx) => (
                  <Combobox.Option
                    key={idx}
                    disabled={item.disabled}
                    className={({ active, selected }) =>
                      clsx(
                        "relative cursor-default select-none py-2 pl-3 pr-9 text-foreground hover:bg-secondary hover:text-secondary-foreground focus:outline-none",
                        !item.disabled && active && "bg-background text-foreground",
                        !item.disabled && !active && " ",
                        item.disabled && "cursor-not-allowed bg-gray-100 text-gray-400"
                      )
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <div className={clsx(selected ? "font-normal" : "font-normal", "truncate")}>{item.name || item.value}</div>
                        </div>

                        {selected ? (
                          <div className={clsx(active ? "" : "", "absolute inset-y-0 right-0 flex items-center pr-4")}>
                            <CheckIcon className="h-4 w-4" />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="text-foreground h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg> */}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))}

                {withSearch && filteredItems().length === 0 && <div className="px-3 py-2 text-sm text-gray-400">{t("shared.noRecords")}</div>}
              </Combobox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Combobox>
  );
}
