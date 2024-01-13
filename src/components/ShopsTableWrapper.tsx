import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, ListItemIcon, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSetRecoilState } from "recoil";
import { shopFormAtom, shopsAtom } from "../atoms/shops.atom";
import { shopsModalAtom } from "../atoms/modal.atom";

function createData(
  shopName: string,
  shopCode: string,
  location: string,
  phoneNumber: string
) {
  return { shopName, shopCode, location, phoneNumber };
}

const rows = [
  createData(
    "Frozen yoghurt",
    "159",
    " oksodfksdopfksdofp asdasd",
    "+01234567898"
  ),
  createData(
    "Ice cream sandwich",
    "237",
    " oksodfksdopfksdofp asdasd",
    "+01234567898"
  ),
  createData("Eclair", "262", " oksodfksdopfksdofp asdasd", "+01234567898"),
  createData("Cupcake", "305", " oksodfksdopfksdofp asdasd", "+01234567898"),
  createData(
    "Gingerbread",
    "356",
    " oksodfksdopfksdofp asdasd",
    "+01234567898"
  ),
];

type Props = {
  onDelete: (id: string) => Promise<void>;
  shops: ShopsType[];
  isError: boolean;
  isLoading: boolean;
};
const ShopsTableWrapper = ({ onDelete, isError, isLoading, shops }: Props) => {
  const setShopsFormValues = useSetRecoilState(shopFormAtom);
  const setOpenModal = useSetRecoilState(shopsModalAtom);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleEdit = (shopsData: ShopsType) => {
    setOpenModal({ isOpen: true, operation: "UPDATE" });
    setShopsFormValues(shopsData);
  };
  const handleDelete = (id: string) => onDelete(id);

  return (
    <TableContainer component={Paper} className="!shadow-xl border">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>shop name </TableCell>
            <TableCell align="right">shop code</TableCell>
            <TableCell align="right">location</TableCell>
            <TableCell align="right">phone number</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            !isError &&
            shops.map((shopItem) => (
              <TableRow
                key={shopItem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {shopItem.shopName}
                </TableCell>
                <TableCell align="right">{shopItem.shopCode}</TableCell>
                <TableCell align="right" width={"600px"}>
                  {shopItem.location.address}
                </TableCell>
                <TableCell align="right">{shopItem.phoneNumber}</TableCell>
                <TableCell align="right" className="relative">
                  <Button
                    variant="text"
                    type="button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    className="w-10 h-10 !rounded-full"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </Button>
                </TableCell>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className="!shadow-sm !shadow-slate-400"
                >
                  <MenuItem onClick={() => handleEdit(shopItem)}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">edit</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(shopItem.id)}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">delete</Typography>
                  </MenuItem>
                </Menu>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShopsTableWrapper;
