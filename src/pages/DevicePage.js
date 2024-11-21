import React, { useState, useEffect } from "react";
import {Container,Button,Dialog,DialogTitle,DialogContent,Box} from "@mui/material";
import DeviceTable from "../components/DeviceTable";
import DeviceForm from "../components/DeviceForm";

export default function DevicePage() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedDevice = JSON.parse(localStorage.getItem("devices")) || [];
    setDevices(storedDevice);
  }, []);

  const handleSaveDevice = (device) => {
    const updatedDevices = selectedDevice
      ? devices.map((item) => (item.id === device.id ? device : item))
      : [...devices, device];
    setDevices(updatedDevices);
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setSelectedDevice(null);
    setIsDialogOpen(false);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    setIsDialogOpen(true);
  };

  const handleDeleteDevice = (id) => {
    const updatedDevice = devices.filter((device) => device.id !== id);
    setDevices(updatedDevice);
    localStorage.setItem("devices", JSON.stringify(updatedDevice));
  };

  return (
    <Container sx={{ p: 3 }}>
      <h2>Manage Devices</h2>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#f06292", color: "#fff" }}
          onClick={() => setIsDialogOpen(true)}
        >
          Add Device
        </Button>
      </Box>
      <Box>
        <DeviceTable
          devices={devices}
          onEdit={handleEditDevice}
          onDelete={handleDeleteDevice}
        />
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedDevice ? "Edit Device" : "Add Device"}
        </DialogTitle>
        <DialogContent>
          <DeviceForm
            device={selectedDevice}
            onSubmit={handleSaveDevice}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
