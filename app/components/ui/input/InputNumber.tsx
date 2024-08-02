import clsx from "clsx";
import { forwardRef, ReactNode, Ref, RefObject, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import SvgOrImg from "~/components/ui/icons/SvgOrImg";
import HintTooltip from "~/components/ui/tooltips/HintTooltip";
import { Input } from "../input";

interface RefInputNumber {
  input: RefObject<HTMLInputElement>;
}
// type WithoutValue = {};
type WithDefaultValue = { defaultValue: number | undefined };
type WithValueAndSetValue = { value: number | undefined; onChange: (value: number | undefined) => void };

type Props = (WithDefaultValue | WithValueAndSetValue) & {
  name?: string;
  title?: string;
  withLabel?: boolean;
  className?: string;
  help?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  hint?: ReactNode;
  step?: string;
  placeholder?: string;
  icon?: string;
  borderless?: boolean;
  autoFocus?: boolean;
  canUnset?: boolean;
};
const InputNumber = (props: Props, ref: Ref<RefInputNumber>) => {
  const { t } = useTranslation();

  const {
    name,
    title,
    withLabel = true,
    className,
    hint,
    help,
    disabled = false,
    readOnly = false,
    required = false,
    min = 0,
    max,
    step,
    placeholder,
    icon,
    // borderless,
    autoFocus,
    canUnset,
  } = props;

  const value = "value" in props ? props.value : undefined;
  const onChange = "onChange" in props ? props.onChange : undefined;
  const defaultValue = "defaultValue" in props ? props.defaultValue : undefined;

  useImperativeHandle(ref, () => ({ input }));
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx(className, "")}>
      {withLabel && (
        <label htmlFor={name} className="mb-1 flex justify-between space-x-2 text-xs font-medium">
          <div className="flex items-center space-x-1">
            <div className="truncate">
              {title}
              {required && <span className="ml-1 text-red-500">*</span>}
            </div>

            {help && <HintTooltip text={help} />}
          </div>
          {canUnset && !required && !disabled && !readOnly && value !== undefined && onChange && (
            <button type="button" onClick={() => (onChange ? onChange(undefined) : null)} className="text-xs text-gray-500">
              {t("shared.clear")}
            </button>
          )}
          {hint}
        </label>
      )}
      <div className={clsx("relative flex w-full rounded-md")}>
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SvgOrImg className="h-5 w-5 text-gray-400" icon={icon} />
          </div>
        )}
        <Input
          ref={input}
          type="number"
          id={name}
          name={name}
          required={required}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => (onChange ? onChange(Number(e.currentTarget.value)) : null)}
          step={step}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          // className={clsx(
          //   "focus:border-accent-500 focus:ring-accent-500 block w-full min-w-0 flex-1 rounded-md border-gray-300 sm:text-sm",
          //   className,
          //   disabled || readOnly ? "cursor-not-allowed bg-gray-100" : "hover:bg-gray-50 focus:bg-gray-50",
          //   icon && "pl-10",
          //   borderless && "border-transparent"
          // )}
        />
      </div>
    </div>
  );
};
export default forwardRef(InputNumber);
