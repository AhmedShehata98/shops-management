type ShopsType = {
  id: string;
  shopName: string;
  shopCode: string;
  phoneNumber: string;
  location: LocationType;
};

type LocationType = {
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
};
