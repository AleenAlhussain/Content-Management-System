import React, { useContext } from "react";
import {Table,TableHead,TableBody,TableCell,TableRow,IconButton,useMediaQuery,useTheme} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "./ThemeContext ";

export default function AccessoryTable({ accessories, onEdit, onDelete }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isDarkTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ overflowX: isMobile ? "auto" : "initial" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Name</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>image</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accessories.map((accessory) => (
            <TableRow key={accessory.id}>
              <TableCell sx={{color: "#807474"}}>{accessory.name}</TableCell>
              <TableCell sx={{color: "#807474"}}>
                <img src={accessory.image} alt={accessory.name} width="50" />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(accessory)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(accessory.id)}>

                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
