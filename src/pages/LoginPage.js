import React, { useState, useContext } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }
    login(name);
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "#003a66", fontWeight: "bold" }}>
          Welcome Back
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          label="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{
            mb: 3,
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          }}
          error={Boolean(error)}
          helperText={error && "Please enter a valid name."}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{
            backgroundColor: "#003a66",
            "&:hover": {
              backgroundColor: "#002a50",
            },
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
