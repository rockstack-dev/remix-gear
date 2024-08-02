import { ReactNode } from "react";
import clsx from "clsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../select";
import { useTranslation } from "react-i18next";

interface Props {
  name?: string;
  options: {
    name: string | ReactNode;
    value: string | number | undefined;
    disabled?: boolean;
    component?: ReactNode;
    color?: number;
  }[];
  value?: string | number | undefined;
  onChange?: (value: string | number | undefined) => void;
  defaultValue?: string | number | undefined;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}
export default function InputSelect({ name, value, defaultValue, options, onChange, required, disabled, placeholder, className }: Props) {
  const { t } = useTranslation();
  return (
    <Select
      name={name}
      value={value?.toString()}
      defaultValue={defaultValue?.toString()}
      onValueChange={(e) => (onChange ? onChange(e) : null)}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger type="button" className={clsx("w-full", className)}>
        <SelectValue placeholder={placeholder || `${t("shared.select")}...`} />
      </SelectTrigger>
      <SelectContent className={clsx("max-h-64 overflow-auto", className)}>
        <SelectGroup>
          {options.map((item, idx) => {
            return (
              <SelectItem key={idx} disabled={item.disabled} value={item.value?.toString() ?? ""}>
                {item.component || (
                  <div className="flex items-center space-x-2">
                    <div>{item.name}</div>
                  </div>
                )}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
