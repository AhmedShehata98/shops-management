import { atom } from "recoil";

export const shopsModalAtom = atom<{
  isOpen: boolean;
  operation: "CREATE" | "UPDATE";
}>({
  key: "shops-modal",
  default: { isOpen: false, operation: "CREATE" },
});
