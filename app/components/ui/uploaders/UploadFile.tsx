import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type FileBase64 = {
  file: File;
  base64: any;
};

interface Props {
  name?: string;
  title?: string;
  accept?: string;
  multiple?: boolean;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  uploadText?: string;
  autoFocus?: boolean;
  onDropped?: (base64: string, file: File) => void;
  onDroppedFiles?: (fileBase64: FileBase64[], files: any[]) => void;
}

export default function UploadFile({
  name = "uploadmyfile",
  className,
  title = "",
  accept,
  multiple,
  description,
  icon = "",
  disabled,
  onDropped,
  onDroppedFiles,
  uploadText,
  autoFocus,
}: Props) {
  const { t } = useTranslation();

  const [isDragging, setIsDragging] = useState(false);
  const [loading] = useState(false);
  const [customClasses, setCustomClasses] = useState("");

  function dragOver(e: any) {
    e.preventDefault();
    if (!loading) {
      setIsDragging(true);
    }
  }
  function dragLeave() {
    setIsDragging(false);
  }
  // async function compressFile(imageFile: File): Promise<File> {
  //   const options = {
  //     maxSizeMB: 0.5,
  //     maxWidthOrHeight: 1920 / 2,
  //     useWebWorker: true,
  //   };
  //   try {
  //     return await imageCompression(imageFile, options);
  //   } catch (error) {
  //     return await Promise.reject(error);
  //   }
  // }
  // async function compressFileNotImage(imageFile: File): Promise<File> {
  //   return Promise.resolve(imageFile);
  // }
  async function drop(e: any) {
    try {
      e.preventDefault();
    } catch {
      // ignore
    }
    const files: File[] = await Promise.all(
      [...e.dataTransfer.files].map(async (element: File) => {
        return element;
        // if (element.type.includes("image")) {
        //   return await compressFile(element);
        // } else {
        //   return await compressFileNotImage(element);
        // }
      })
    );
    const filesArray: FileBase64[] = [];

    await Promise.all(
      files.map(async (file) => {
        const base64 = await getBase64(file);
        filesArray.push({
          base64,
          file,
        });
        if (onDropped) {
          onDropped(base64, file);
        }
      })
    );
    if (onDroppedFiles) {
      onDroppedFiles(filesArray, files);
    }
    setIsDragging(false);
  }
  function requestUploadFile() {
    const src = document.querySelector("#" + name);
    drop({ dataTransfer: src });
  }
  function getBase64(file: File): Promise<string> {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (ev) => {
        resolve(ev?.target?.result?.toString() ?? "");
      };
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    setCustomClasses(isDragging && !loading && !disabled ? "border-2 border-border border-dashed" : "");
  }, [isDragging, loading, disabled]);

  return (
    <div
      className={clsx(
        "drop flex items-center overflow-hidden rounded-md border-2 border-dashed border-border text-center hover:bg-background/90",
        customClasses,
        className
      )}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
    >
      {(() => {
        if (loading) {
          return <div className="mx-auto text-base font-medium">{t("shared.loading")}...</div>;
        } else {
          return (
            <div>
              <div className="mx-auto text-sm font-bold text-primary">{title}</div>
              <div className="manual">
                <div className="space-y-1 text-center">
                  {icon}
                  <div className="flex flex-col text-sm text-gray-600">
                    <label
                      htmlFor={name}
                      className={clsx(
                        "relative cursor-pointer rounded-md font-medium text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        !disabled && ""
                      )}
                    >
                      <span></span>
                      <label htmlFor={name}>
                        <p className={clsx("text-sm font-semibold underline", !disabled ? "cursor-pointer" : "cursor-not-allowed")}>
                          {uploadText ?? <span>{t("app.shared.buttons.uploadDocument")}</span>}
                        </p>
                      </label>
                      <input
                        className="uploadmyfile"
                        disabled={disabled}
                        type="file"
                        id={name}
                        accept={accept}
                        multiple={multiple}
                        onChange={requestUploadFile}
                        autoFocus={autoFocus}
                      />
                    </label>
                    {/* <p className="pl-1 lowercase">
                      {t("shared.or")} {t("shared.dragAndDrop")}
                    </p> */}
                  </div>
                  <p className="text-xs text-gray-500">
                    {description ?? (
                      <span className="lowercase">
                        {t("shared.or")} {t("shared.dragAndDrop")}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
}
