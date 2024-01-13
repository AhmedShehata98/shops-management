import { Button, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useSetRecoilState } from "recoil";
import { shopsModalAtom } from "../atoms/modal.atom";

const HeadingBar = () => {
  const setOpenModal = useSetRecoilState(shopsModalAtom);
  const openModal = () => setOpenModal({ operation: "CREATE", isOpen: true });
  return (
    <div className="w-full flex items-center justify-start gap-4 mb-2">
      <Typography fontWeight={"600"} textTransform={"capitalize"}>
        shops management
      </Typography>
      <Button onClick={openModal} startIcon={<AddCircleOutlinedIcon />}>
        add shop
      </Button>
    </div>
  );
};

export default HeadingBar;
