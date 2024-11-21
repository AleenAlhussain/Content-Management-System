import React, { useState, useEffect } from "react";
import {Container, Button, Dialog,DialogTitle,DialogContent,FormControl,InputLabel,Select,MenuItem,} from "@mui/material";
import AccessoryTable from "../components/AccessoryTable";
import AccessoryForm from "../components/AccessoryForm";

const AccessoriesPage = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    setDevices(storedDevices);
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      const storedAccessories =
        JSON.parse(localStorage.getItem("accessories")) || [];
      const filteredAccessories = storedAccessories.filter(
        (accessory) => accessory.deviceId === selectedDeviceId
      );
      setAccessories(filteredAccessories);
    }
  }, [selectedDeviceId]);

  const handleSaveAccessory = (accessory) => {
    const storedAccessories =
      JSON.parse(localStorage.getItem("accessories")) || [];
    let updatedAccessories;
    if (selectedAccessory) {
      updatedAccessories = storedAccessories.map((a) =>
        a.id === accessory.id ? accessory : a
      );
    } else {
      updatedAccessories = [...storedAccessories, accessory];
    }

    localStorage.setItem("accessories", JSON.stringify(updatedAccessories));
    setIsDialogOpen(false);
    setSelectedAccessory(null);
    setAccessories(
      updatedAccessories.filter((a) => a.deviceId === selectedDeviceId)
    );
  };

  const handleEditAccessory = (accessory) => {
    setSelectedAccessory(accessory);
    setIsDialogOpen(true);
  };

  const handleDeleteAccessory = (id) => {
    const storedAccessories =
      JSON.parse(localStorage.getItem("accessories")) || [];
    const updatedAccessories = storedAccessories.filter(
      (accessory) => accessory.id !== id
    );
    localStorage.setItem("accessories", JSON.stringify(updatedAccessories));
    setAccessories(
      updatedAccessories.filter((a) => a.deviceId === selectedDeviceId)
    );
  };

  return (
    <Container sx={{ p:3}}>
      <h2>
        Manage Accessories
      </h2>
      <FormControl fullWidth sx={{ mt: 3}}>
        <InputLabel>Select Device</InputLabel>
        <Select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          {devices.map((device) => (
            <MenuItem key={device.id} value={device.id}
            >
              {device.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedDeviceId && (
        <>
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#f06292", color: "#fff" }}
            onClick={() => {
              setSelectedAccessory(null);
              setIsDialogOpen(true);
            }}
          >
            Add Accessory
          </Button>
          <AccessoryTable
            accessories={accessories}
            onEdit={handleEditAccessory}
            onDelete={handleDeleteAccessory}
          />
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>
              {selectedAccessory ? "Edit Accessory" : "Add Accessory"}
            </DialogTitle>
            <DialogContent>
              <AccessoryForm
                accessory={selectedAccessory}
                devices={devices}
                selectedDeviceId={selectedDeviceId}
                selectedDeviceName={
                  devices.find((d) => d.id === selectedDeviceId)?.name || ""
                }
                onSubmit={handleSaveAccessory}
                onClose={() => setIsDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default AccessoriesPage;
