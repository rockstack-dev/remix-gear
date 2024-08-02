import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  description?: string;
  className?: string;
  right?: ReactNode;
}
export default function InputGroup({ title, description, icon, children, right, className }: Props) {
  return (
    <div className={clsx("space-y-3")}>
      {(title || right) && (
        <div className="flex items-center justify-between space-x-2">
          <h3 className="text-sm font-medium leading-3 text-gray-800">
            <div className="flex items-center space-x-1">
              {icon}
              <div>
                <span className="font-light italic"></span> {title}
              </div>
            </div>
          </h3>
          {right}
        </div>
      )}
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <div className={clsx("rounded-md border border-border bg-background px-4 py-5 shadow", className)}>{children}</div>
    </div>
  );
}
