import React, { useState, useContext } from "react";
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom";
import { Box, useMediaQuery, useTheme, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./pages/SideBar";
import DevicesPage from "./pages/DevicePage";
import AccessoriesPage from "./pages/AccessoryPage";
import OffersPage from "./pages/offerPage";
import LoginPage from "./pages/LoginPage";
import { ThemeContext } from "./components/ThemeContext ";
import { AuthContext } from "./components/AuthContext";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`App ${isDarkTheme ? "darkTheme" : "lightTheme"}`}>
      <Router>
        <Box sx={{ display: "flex" }}>
          {isAuthenticated && (
            <Sidebar
              open={sidebarOpen}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
            />
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {isAuthenticated && <Header />}
            {isAuthenticated && isMobile && (
              <IconButton
                onClick={handleDrawerOpen}
                sx={{ position: "absolute", top: 8, left: 16 }}
              >
                <MenuIcon sx={{ color: isDarkTheme ? "#fff" : "#003a66" }} />
              </IconButton>
            )}
            <Box>
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <DevicesPage /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/accessories"
                  element={
                    isAuthenticated ? (
                      <AccessoriesPage />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/offers"
                  element={
                    isAuthenticated ? <OffersPage /> : <Navigate to="/login" />
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </div>
  );
};

export default App;
