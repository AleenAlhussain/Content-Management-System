import React, { useState } from "react";
import {TextField,Button,Grid,FormControl,Select,InputLabel,MenuItem} from "@mui/material";

const AccessoryForm = ({ accessory, devices, onSubmit, onClose }) => {
  const [name, setName] = useState(accessory?.name || "");
  const [image, setImage] = useState(accessory?.image || "");
  const [deviceId, setDeviceId] = useState(accessory?.deviceId || "");

  const [errors, setErrors] = useState({
    name: false,
    image: false,
    deviceId: false,
  });

  const handleImageUpload = (e) => {
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
      image: !image,
      deviceId: !deviceId,
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    const newAccessory = {
      id: accessory?.id || Date.now(),
      name,
      image,
      deviceId,
    };
    onSubmit(newAccessory);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Accessory Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          error={errors.name}
          helperText={errors.name ? "Accessory Name is required" : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.deviceId} required>
          <InputLabel>Device</InputLabel>
          <Select
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          >
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
          {errors.deviceId && (
            <p style={{ color: "#f44336", marginTop: "8px" }}>
              Device selection is required
            </p>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          component="label"
          style={{ backgroundColor: "#f06292", color: "#fff" }}
        >
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
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

export default AccessoryForm;
