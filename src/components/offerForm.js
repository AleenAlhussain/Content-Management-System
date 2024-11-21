import React, { useState } from "react";
import {TextField,Button,Grid,Checkbox,FormControlLabel,FormGroup} from "@mui/material";

const OfferForm = ({offer,selectedDeviceId,selectedDeviceName,accessories,onSubmit}) => {
  const [deviceId] = useState(selectedDeviceId);
  const [selectedAccessories, setSelectedAccessories] = useState(
    offer?.accessoryIds || []
  );
  const [offerPrice, setOfferPrice] = useState(offer?.price || "");
  const [offerEndDate, setOfferEndDate] = useState(offer?.endDate || "");
  const [errors, setErrors] = useState({
    price: false,
    endDate: false,
  });

  const handleAccessoryChange = (id) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((accId) => accId !== id) : [...prev, id]
    );
  };
  
  const handleSubmit = () => {
    const price = parseFloat(offerPrice);
    const newErrors = {
      price: isNaN(price) || price <= 0,
      endDate: !offerEndDate,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    const newOffer = {
      id: offer?.id || Date.now(),
      deviceId,
      accessoryIds: selectedAccessories,
      price: price,
      endDate: offerEndDate,
    };
    onSubmit(newOffer);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Device"
          value={selectedDeviceName}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          {accessories.map((accessory) => (
            <FormControlLabel
              key={accessory.id}
              control={
                <Checkbox
                  checked={selectedAccessories.includes(accessory.id)}
                  onChange={() => handleAccessoryChange(accessory.id)}
                />
              }
              label={accessory.name}
            />
          ))}
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="number"
          label="Offer Price"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          required
          error={errors.price}
          helperText={
            errors.price ? "Offer Price must be a positive number" : ""
          }
          inputProps={{ min: 0, step: "any" }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="date"
          label="Offer End Date"
          value={offerEndDate}
          onChange={(e) => setOfferEndDate(e.target.value)}
          required
          error={errors.endDate}
          helperText={errors.endDate ? "Offer End Date is required" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f06292", color: "#fff" }}
          onClick={handleSubmit}
        >
          Save Offer
        </Button>
      </Grid>
    </Grid>
  );
};

export default OfferForm;
