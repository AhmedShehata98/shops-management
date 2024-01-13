import { atom } from "recoil";

export const shopsAtom = atom<Array<ShopsType>>({
  key: "shops",
  default: [],
});

export const shopFormAtom = atom<ShopsType>({
  key: "selected-shop-item",
  default: {
    id: "",
    shopName: "",
    shopCode: "",
    location: {
      address: "",
      latlng: { lat: 0, lng: 0 },
    },
    phoneNumber: "",
  },
});
