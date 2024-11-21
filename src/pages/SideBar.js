import React from "react";
import { Link } from "react-router-dom";
import {Drawer,List,ListItem,ListItemText,ListItemIcon,Typography,IconButton,useMediaQuery,useTheme,} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DevicesIcon from "@mui/icons-material/Devices";
import AccessoriesIcon from "@mui/icons-material/DevicesOther";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : undefined}
      onClose={isMobile ? onClose : undefined}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1b3f59",
          color: "#fff",
        },
      }}
    >
      {isMobile && (
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon sx={{ color: "#fff" }} />
        </IconButton>
      )}
      <Typography variant="h6" sx={{ padding: 2, color: "#fff" }}>
        Mobile CMS
      </Typography>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          sx={{ padding: 2, color: "#fff" }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
            <DevicesIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
          {isMobile && <ChevronRightIcon sx={{ color: "#fff" }} />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/accessories"
          sx={{ padding: 2, color: "#fff" }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
            <AccessoriesIcon />
          </ListItemIcon>
          <ListItemText primary="Accessories" />
          {isMobile && <ChevronRightIcon sx={{ color: "#fff" }} />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/offers"
          sx={{ padding: 2, color: "#fff" }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText primary="Offers" />
          {isMobile && <ChevronRightIcon sx={{ color: "#fff" }} />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
