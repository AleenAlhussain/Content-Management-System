import React, { useContext } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { ThemeContext } from "./ThemeContext "

const OfferDetails = ({ offer, accessories, onEdit, onDelete }) => {
  const offerAccessories = accessories.filter((acc) =>
    offer.accessoryIds.includes(acc.id)
  );
  const { isDarkTheme } = useContext(ThemeContext);
  
  return (
    <Grid
      container
      spacing={1}
      sx={{
        mt: 3,
         border: `2px solid ${isDarkTheme ? "#ccc6" : "#003a66"}`,
        borderRadius: "8px",
        padding: 2,
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ color:isDarkTheme ? "#ccc6" : "#003a66" }}>
          Offer Price: {offer.price}$
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ color:isDarkTheme ? "#ccc6" : "#003a66" }}>
          Offer End Date: {offer.endDate}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ color:isDarkTheme ? "#ccc6" : "#003a66" }}>
          Accessories Included:
        </Typography>
        <ul>
          {offerAccessories.map((accessory) => (
            <li key={accessory.id}>
              {accessory.name}
            </li>
          ))}
        </ul>
      </Grid>
      <Grid item xs={12} container justifyContent="space-between">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f06292", color: "#fff", mt: 2 }}
          onClick={onEdit}
        >
          Edit Offer
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: isDarkTheme ? "#fff" : "#003a66",
            color: isDarkTheme ? "#003a66" : "#fff", mt: 2 }}
          onClick={onDelete}
        >
          Delete Offer
        </Button>
      </Grid>
    </Grid>
  );
};

export default OfferDetails;
