import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const DeviceForm = ({ device, onSubmit, onClose }) => {
  const [name, setName] = useState(device?.name || "");
  const [image, setImage] = useState(device?.image || "");
  const [madeIn, setMadeIn] = useState(device?.madeIn || "");
  const [ramSize, setRamSize] = useState(device?.ramSize || "");
  const [storageSize, setStorageSize] = useState(device?.storageSize || "");

  const [errors, setErrors] = useState({
    name: false,
    madeIn: false,
    ramSize: false,
    storageSize: false,
    image: false,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !name,
      madeIn: !madeIn,
      ramSize: !ramSize || Number(ramSize) <= 0,
      storageSize: !storageSize || Number(storageSize) <= 0,
      image: !image,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    const newDevice = {
      id: device?.id || Date.now(),
      name,
      madeIn,
      ramSize,
      storageSize,
      image,
    };
    onSubmit(newDevice);
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Device Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={errors.name}
          helperText={errors.name ? "Device Name is required" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="date"
          label="Made in"
          InputLabelProps={{ shrink: true }}
          value={madeIn}
          onChange={(e) => setMadeIn(e.target.value)}
          required
          error={errors.madeIn}
          helperText={errors.madeIn ? "Manufacture date is required" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="number"
          label="RAM Size (GB)"
          value={ramSize}
          onChange={(e) => setRamSize(e.target.value)}
          required
          error={errors.ramSize}
          helperText={errors.ramSize ? "RAM Size must be a number" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="number"
          label="Storage Size (GB)"
          value={storageSize}
          onChange={(e) => setStorageSize(e.target.value)}
          required
          error={errors.storageSize}
          helperText={errors.storageSize ? "Storage Size must be a number" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          component="label"
          style={{ backgroundColor: "#f06292", color: "#fff" }}
        >
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {errors.image && (
          <p style={{ color: "red", marginTop: "8px" }}>Image is required</p>
        )}
        
      </Grid>
      <Grid item xs={12} container justifyContent="space-between">
        <Button
          variant="contained"
          style={{ backgroundColor: "#f06292", color: "#fff" }}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          style={{ color: "#003a66", borderColor: "#003a66" }}
          onClick={onClose}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeviceForm;
