import React, { useState, useEffect } from "react";
import {Container,Button,Dialog,DialogTitle,DialogContent,FormControl,InputLabel,Select, MenuItem,Typography,} from "@mui/material";
import OfferForm from "../components/offerForm";
import OfferDetails from "../components/offerDetails";

const OffersPage = () => {
  const [devices, setDevices] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    const storedAccessories =
      JSON.parse(localStorage.getItem("accessories")) || [];
    const storedOffers = JSON.parse(localStorage.getItem("offers")) || [];
    setDevices(storedDevices);
    setAccessories(storedAccessories);
    setOffers(storedOffers);
  }, []);

  useEffect(() => {
    const offer = offers.find((offer) => offer.deviceId === selectedDeviceId);
    setCurrentOffer(offer);
  }, [selectedDeviceId, offers]);

  const handleSaveOffer = (offer) => {
    const updatedOffers = currentOffer
      ? offers.map((item) => (item.id === offer.id ? offer : item))
      : [...offers, offer];
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    setIsDialogOpen(false);
    setCurrentOffer(offer);
  };

  const handleEditOffer = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteOffer = () => {
    const updatedOffers = offers.filter((o) => o.id !== currentOffer.id);
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    setCurrentOffer(null);
  };

  const selectedDevice = devices.find(
    (device) => device.id === selectedDeviceId
  );
  const selectedDeviceName = selectedDevice ? selectedDevice.name : "";

  return (
    <Container sx={{ p:3}}>
      <h2 >Our Offers</h2>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Select Device</InputLabel>
        <Select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
        >
          {devices.map((device) => (
            <MenuItem key={device.id} value={device.id}>
              {device.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedDeviceId && (
        <>
          {currentOffer ? (
            <OfferDetails
              offer={currentOffer}
              accessories={accessories}
              onEdit={handleEditOffer}
              onDelete={handleDeleteOffer}
            />
          ) : (
            <div>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                No offer on this device
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#f06292", color: "#fff" }}
                onClick={() => setIsDialogOpen(true)}
              >
                Create Offer
              </Button>
            </div>
          )}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>
              {currentOffer ? "Edit Offer" : "Create Offer"}
            </DialogTitle>
            <DialogContent>
              <OfferForm
                offer={currentOffer}
                selectedDeviceId={selectedDeviceId}
                selectedDeviceName={selectedDeviceName}
                accessories={accessories}
                onSubmit={handleSaveOffer}
              />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default OffersPage;
