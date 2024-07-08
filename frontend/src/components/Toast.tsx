import { Icon, IconType } from "./Icon";
import { useSetRecoilState } from "recoil";
import { toast } from "../recoil/atom/atom";
import { useEffect } from "react";

export const Toast = ({
  isVisible,
  message,
  type,
  closeRequired,
}: {
  isVisible: boolean;
  message: string;
  type: "info" | "success" | "error" | string;
  closeRequired: boolean;
}) => {
  if (!isVisible) return null;

  const setToast = useSetRecoilState(toast);

  let themeColor = "";
  switch (type) {
    case "info":
      themeColor = "bg-blue-100";
      break;
    case "success":
      themeColor = "bg-green-100";
      break;
    case "error":
      themeColor = "bg-red-100";
      break;
    default:
      themeColor = "bg-blue-100";
      break;
  }

  const closeToast = () => {
    setToast({
      toastMessage: "",
      toastType: "",
      toastVisible: false,
      isToastCloseRequired: false,
    });
  };

  console.log("toast render");

  useEffect(() => {
    if (closeRequired) {
      setTimeout(() => {
        closeToast();
      }, 5000);
    }
  }, [closeRequired]);

  return (
    <>
      <div
        id="toast-success"
        className={`fixed right-4 bottom-2 flex items-center w-full max-w-[21rem] p-4 mb-4 text-black font-semibold ${themeColor} rounded-lg drop-shadow-lg`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mt-0.5">
          <Icon type={type as IconType} />
        </div>
        <div className="ms-3 me-3 font-normal">{message}</div>
        <button
          type="button"
          className={`ms-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 ${themeColor}`}
          data-dismiss-target="#toast-success"
          aria-label="Close"
          onClick={closeToast}
        >
          <Icon type="cross" />
        </button>
      </div>
      )
    </>
  );
};
