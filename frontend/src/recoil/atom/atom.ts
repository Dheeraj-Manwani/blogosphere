import { atom } from "recoil";

export const loggedUser = atom({
  key: "loggedUserState",
  default: "",
});

export const modal = atom({
  key: "modal",
  default: { visible: false, message: "Something went wrong!", href: "" },
});
