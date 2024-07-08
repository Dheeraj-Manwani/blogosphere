import { Appbar } from "../components/Appbar";
import { Outlet } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modal, toast } from "../recoil/atom/atom";
import { Toast } from "../components/Toast";
import { Footer } from "../components/Footer";

export const Root = () => {
  const { visible, message, href } = useRecoilValue(modal);
  const { toastVisible, toastMessage, toastType, isToastCloseRequired } =
    useRecoilValue(toast);
  return (
    <>
      <Appbar />
      <div className="p-11"></div>
      <Outlet />
      <Footer />
      <Modal isVisible={visible} message={message} href={href} />
      <Toast
        isVisible={toastVisible}
        message={toastMessage}
        type={toastType}
        closeRequired={isToastCloseRequired}
      />
    </>
  );
};
