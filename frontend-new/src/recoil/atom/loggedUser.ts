import { atom } from "recoil";

export const loggedUser = atom({
  key: "loggedUserState",
  default: "",
});
