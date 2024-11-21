import React, { useContext } from "react";
import {Table,TableHead,TableBody,TableCell,TableRow,IconButton,useMediaQuery,useTheme} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "./ThemeContext ";

const DeviceTable = ({ devices, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isDarkTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ overflowX: isMobile ? "auto" : "initial" }}>
      <Table>
        <TableHead>
          <TableRow >
            <TableCell  sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Name</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Made in</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Image</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Ram Size</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}} >Storage Size</TableCell>
            <TableCell sx={{color: isDarkTheme ? "#fff" : "#003a66"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell style={{ color: "#807474" }}>{device.name}</TableCell>
              <TableCell style={{ color: "#807474" }}>{device.madeIn}</TableCell>
              <TableCell style={{ color: "#807474" }}>
                <img src={device.image} alt={device.name} width="50" />
              </TableCell>
              <TableCell style={{ color: "#807474" }}>{device.ramSize}</TableCell>
              <TableCell style={{ color: "#807474" }}>
                {device.storageSize}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEdit(device)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(device.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DeviceTable;
