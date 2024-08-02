import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import HintTooltip from "~/components/ui/tooltips/HintTooltip";
import { Checkbox } from "../checkbox";

interface Props {
  name?: string;
  title?: string;
  withLabel?: boolean;
  value?: boolean | undefined;
  onChange?: (value: boolean) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  asToggle?: boolean;
  readOnly?: boolean;
  hint?: ReactNode;
  help?: string;
  icon?: string;
  autoFocus?: boolean;
}

export default function InputCheckbox({
  name,
  title,
  withLabel = true,
  value,
  onChange,
  className,
  required,
  disabled,
  asToggle,
  readOnly,
  hint,
  help,
  icon,
  autoFocus,
}: Props) {
  // useImperativeHandle(ref, () => ({ input }));
  // const input = useRef<HTMLInputElement>(null);

  const [actualValue, setActualValue] = useState(value ?? false);

  useEffect(() => {
    setActualValue(value ?? false);
  }, [value]);

  useEffect(() => {
    if (onChange && actualValue !== value) {
      onChange(actualValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualValue]);

  return (
    <div className={clsx(className, "")}>
      {withLabel && title && (
        <label htmlFor={name} className="mb-1 flex justify-between space-x-2 text-xs font-medium">
          <div className="flex items-center space-x-1">
            <div className="truncate">
              {title}
              {required && <span className="ml-1 text-red-500">*</span>}
            </div>
            <div className="">{help && <HintTooltip text={help} />}</div>
          </div>
          {hint}
        </label>
      )}
      <div className={clsx("relative flex w-full rounded-md")}>
        <input type="hidden" name={name} value={actualValue === true ? "true" : "false"} hidden readOnly />
        {asToggle ? (
          <Switch
            checked={actualValue}
            onChange={setActualValue}
            disabled={disabled || readOnly}
            autoFocus={autoFocus}
            className={clsx(
              actualValue ? "bg-primary" : "bg-secondary",
              "relative inline-flex h-5 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              icon && "pl-10",
              (disabled || readOnly) && "cursor-not-allowed opacity-60"
            )}
          >
            <span
              aria-hidden="true"
              className={clsx(
                actualValue ? "translate-x-3" : "translate-x-0",
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        ) : (
          <Checkbox
            id={name}
            name={name}
            onCheckedChange={(e) => setActualValue(e === "indeterminate" ? actualValue : e)}
            disabled={disabled || readOnly}
            autoFocus={autoFocus}
            checked={actualValue}
            className={clsx(
              (disabled || readOnly) && "cursor-not-allowed bg-gray-100",
              "mt-1 h-6 w-6 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary",
              className,
              icon && "pl-10"
            )}
          />
        )}
      </div>
    </div>
  );
}
