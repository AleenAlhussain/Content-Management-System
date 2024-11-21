import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { ThemeContext } from "./ThemeContext ";
import { AuthContext } from "./AuthContext";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { isAuthenticated, userName, logout } = useContext(AuthContext);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkTheme ? "#1b3f59" : "#fff",
        color: "#003a66",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "start",
            ml: 5,
          }}
        >
          {isAuthenticated && (
            <Typography
              variant="h6"
              sx={{ color: isDarkTheme ? "#fff" : "#003a66" }}
            >
              {userName}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ThemeSwitcher />
          {isAuthenticated ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: isDarkTheme ? "#fff" : "#003a66",
                color:  isDarkTheme ? "#003a66" : "#fff"
              }}
              onClick={logout}
            >
              Logout
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
