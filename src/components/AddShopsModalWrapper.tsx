import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  TextField,
  Typography,
} from "@mui/material";
import GmapsWrapper from "./GmapsWrapper";
import { useRecoilState, useSetRecoilState } from "recoil";
import { shopsModalAtom } from "../atoms/modal.atom";
import { shopFormAtom } from "../atoms/shops.atom";
import { mapPathAtom } from "../atoms/mapPath.atom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #e6e3e3",
  boxShadow: 24,
  p: 5,
  borderRadius: 6,
};

type Props = {
  onCreate: (newShopData: Omit<ShopsType, "id">) => Promise<void>;
  onEdit: (
    id: string,
    newShopData: Partial<Omit<ShopsType, "id">>
  ) => Promise<void>;
};
const AddShopsModalWrapper = ({ onCreate, onEdit }: Props) => {
  const [{ isOpen, operation }, setOpenModal] = useRecoilState(shopsModalAtom);
  const [shopsFormValues, setShopsFormValues] = useRecoilState(shopFormAtom);
  const setPaths = useSetRecoilState(mapPathAtom);

  const handleClose = () =>
    setOpenModal((currVal) => ({ ...currVal, isOpen: false }));

  const onSelectLocation = async (ev: google.maps.MapMouseEvent) => {
    try {
      const coords = { lat: ev.latLng?.lat(), lng: ev.latLng?.lng() };

      if (!coords.lat)
        throw new Error(`invalid coordinates provided ,${coords}`);
      if (!coords.lng)
        throw new Error(`invalid coordinates provided ,${coords}`);
      const location = {
        address: await getLocationAddressName(coords),
        latlng: coords,
      } as LocationType;

      setPaths((currVal) => {
        if (
          currVal.findIndex(
            (val) => val.lat === coords.lat && val.lng === coords.lng
          ) === -1
        ) {
          return [...currVal, coords];
        }
        return currVal;
      });
      setShopsFormValues((currVal) => ({ ...currVal, location }));
    } catch (error) {
      console.log(error);
    }
  };

  const getLocationAddressName = async (coords: {
    lat: number | undefined;
    lng: number | undefined;
  }) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          coords.lat
        },${coords.lng}&sensor=true&key=${import.meta.env.VITE_GMAPS_API_KEY}`
      );
      const location = await res.json();
      return location.results?.[0].formatted_address;
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = () => {
    onEdit(shopsFormValues.id, {
      shopName: shopsFormValues.shopName,
      shopCode: shopsFormValues.shopCode,
      location: shopsFormValues.location,
      phoneNumber: shopsFormValues.phoneNumber,
    }).then(() => {
      setShopsFormValues({
        id: "",
        location: {
          address: "",
          latlng: { lat: 0, lng: 0 },
        },
        phoneNumber: "",
        shopCode: "",
        shopName: "",
      });
      setOpenModal((currVal) => ({ ...currVal, isOpen: false }));
    });
  };
  const handleCreate = () => {
    onCreate({
      shopName: shopsFormValues.shopName,
      shopCode: shopsFormValues.shopCode,
      location: shopsFormValues.location,
      phoneNumber: shopsFormValues.phoneNumber,
    }).then(() => {
      setShopsFormValues({
        id: "",
        location: {
          address: "",
          latlng: { lat: 0, lng: 0 },
        },
        phoneNumber: "",
        shopCode: "",
        shopName: "",
      });
      setOpenModal((currVal) => ({ ...currVal, isOpen: false }));
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Typography
            color={"blue"}
            fontWeight={"700"}
            textTransform={"capitalize"}
          >
            shops location
          </Typography>
          <div className="max-w-full h-[400px] my-4">
            <GmapsWrapper onClick={onSelectLocation} />
          </div>
          <div className="full flex items-center justify-center gap-6 my-4 py-2">
            <TextField
              id="shopName"
              label="shop name"
              variant="outlined"
              className="!w-1/3"
              color="primary"
              value={shopsFormValues.shopName}
              onChange={(ev) =>
                setShopsFormValues((currVal) => ({
                  ...currVal,
                  [ev.target.id]: ev.target.value,
                }))
              }
            />
            <TextField
              id="phoneNumber"
              label="phone number"
              variant="outlined"
              color="primary"
              className="!w-1/3"
              value={shopsFormValues.phoneNumber}
              onChange={(ev) =>
                setShopsFormValues((currVal) => ({
                  ...currVal,
                  [ev.target.id]: ev.target.value,
                }))
              }
            />
            <TextField
              id="shopCode"
              label="shop code"
              variant="outlined"
              color="primary"
              className="!w-1/3"
              value={shopsFormValues.shopCode}
              onChange={(ev) =>
                setShopsFormValues((currVal) => ({
                  ...currVal,
                  [ev.target.id]: ev.target.value,
                }))
              }
            />
          </div>
          <div className="max-w-full flex items-center justify-center gap-4 mt-4 py-2">
            <Button
              variant="outlined"
              color="error"
              className="!px-6"
              onClick={() =>
                setOpenModal((currVal) => ({ ...currVal, isOpen: false }))
              }
            >
              cancel
            </Button>
            {operation === "CREATE" && (
              <Button
                variant="contained"
                color="primary"
                className="!px-6"
                onClick={handleCreate}
              >
                add
              </Button>
            )}
            {operation === "UPDATE" && (
              <Button
                variant="contained"
                color="primary"
                className="!px-6"
                onClick={handleUpdate}
              >
                save
              </Button>
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddShopsModalWrapper;
