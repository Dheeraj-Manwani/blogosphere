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
      <Outlet />
      <Modal isVisible={visible} message={message} href={href} />
    </>
  );
};
