import { Appbar } from "../components/Appbar";
import { Outlet } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useRecoilValue } from "recoil";
import { modal } from "../recoil/atom/atom";

export const Root = () => {
  const { visible, message, href } = useRecoilValue(modal);
  return (
    <>
      <Appbar />
      <div className="p-11"></div>
      <Outlet />
      <Modal isVisible={visible} message={message} href={href} />
    </>
  );
};
