import { atom } from "recoil";

export const loggedUser = atom({
  key: "loggedUserState",
  default: { id: "", name: "", email: "" },
});

export const modal = atom({
  key: "modal",
  default: { visible: false, message: "Something went wrong!", href: "" },
});

export const toast = atom({
  key: "toast",
  default: {
    toastVisible: true,
    toastMessage: "Loading...",
    toastType: "info",
    isToastCloseRequired: true,
  },
});
