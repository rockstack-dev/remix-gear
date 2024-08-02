import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UploadFile from "../uploaders/UploadFile";
import clsx from "clsx";
import { Input } from "../input";

type WithDefaultValue = { defaultValue: string | undefined };
type WithValueAndSetValue = { value: string | undefined; onChange: React.Dispatch<React.SetStateAction<string>> };

type Props = (WithDefaultValue | WithValueAndSetValue) & {
  name?: string;
  title?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  square?: boolean;
  required?: boolean;
  hint?: React.ReactNode;
  accept?: string;
  placeholder?: string;
  opened?: boolean;
  description?: string;
  className?: string;
};
export default function InputImage(props: Props) {
  const value = "value" in props ? props.value : undefined;
  const onChange = "onChange" in props ? props.onChange : undefined;
  const defaultValue = "defaultValue" in props ? props.defaultValue : undefined;
  const size = props.size ?? "large";
  const square = props.square ?? false;

  const { t } = useTranslation();
  const [showUploadImage, setShowUploadImage] = useState((props.opened && (!value || defaultValue)) ?? false);
  const [image, setImage] = useState(value || defaultValue || "");

  useEffect(() => {
    if (onChange && value !== image) {
      onChange(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const imageClassName = clsx(
    "mx-auto",
    square ? "object-cover" : "object-contain",
    size === "small" && "h-8",
    size === "medium" && "h-16",
    size === "large" && "h-32",
    square && clsx(size === "small" && "w-8", size === "medium" && "w-16", size === "large" && "w-32")
  );

  return (
    <div className={clsx("space-y-1", props.className)}>
      <input name={props.name} type="hidden" value={image} readOnly hidden />

      <label htmlFor={props.name} className="flex items-baseline justify-between space-x-2 truncate text-xs font-medium">
        <div className="flex flex-shrink-0 items-center space-x-1 truncate">
          <div className="flex space-x-1 truncate">
            <div className="truncate">{props.title}</div>
            {props.required && props.title && <div className="ml-1 text-red-500">*</div>}
          </div>
        </div>
        {props.hint && <div>{props.hint}</div>}
      </label>

      <div className={clsx("relative flex w-full rounded-md")}>
        <Input
          name={props.name}
          required={props.required}
          value={image}
          onChange={(e) => setImage(e.currentTarget.value)}
          readOnly={image.startsWith("data:image")}
          placeholder={props.placeholder ?? "URL..."}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <div className="inline-flex items-center rounded border border-gray-200 bg-white px-2 font-sans text-sm font-medium text-gray-500">
            {!image ? (
              <button type="button" onClick={() => setShowUploadImage(true)}>
                {t("shared.upload")}
              </button>
            ) : (
              <button
                type="button"
                disabled={props.disabled}
                onClick={() => {
                  setImage("");
                  setShowUploadImage(true);
                }}
              >
                {t("shared.remove")}
              </button>
            )}
          </div>
        </div>
      </div>
      {showUploadImage && (
        <UploadFile
          name={props.name + "-file"}
          disabled={props.disabled}
          className="col-span-12 h-32"
          accept={props.accept || "image/png, image/jpg, image/jpeg"}
          description={props.description}
          onDropped={(e) => {
            setImage(e);
            setShowUploadImage(false);
          }}
        />
      )}
      {!showUploadImage && image && (
        <div className="col-span-12">
          <div
            className={clsx(
              "relative overflow-hidden rounded-lg border border-border bg-background",
              !square && "p-4",
              square && size === "small" && "w-8",
              square && size === "medium" && "w-16",
              square && size === "large" && "w-32"
            )}
          >
            {/* <button
              type="button"
              className="absolute inset-0 bg-black bg-opacity-0 transition-colors duration-200 hover:bg-opacity-50"
              onClick={() => setShowUploadImage(true)}
            >
              <div className="flex h-full items-center justify-center text-sm font-medium text-white">{t("shared.upload")}</div>
            </button> */}
            <button
              type="button"
              className="absolute right-0 top-0 bg-black bg-opacity-50 p-1 transition-colors duration-200 hover:bg-opacity-75"
              onClick={() => setImage("")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {image.startsWith("<svg") ? (
              <div dangerouslySetInnerHTML={{ __html: image.replace("<svg", `<svg class='${imageClassName}'`) ?? "" }} />
            ) : (
              <img className={imageClassName} src={image} alt={props.title} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
