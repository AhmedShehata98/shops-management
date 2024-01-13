import { atom } from "recoil";

export const mapPathAtom = atom<
  Array<{
    lat: number | undefined;
    lng: number | undefined;
  }>
>({
  key: "map-path",
  default: [],
});
