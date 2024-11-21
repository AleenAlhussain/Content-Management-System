import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext ';
import { Switch } from "@mui/material";

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={isDarkTheme}
      onChange={toggleTheme}
      color="default"
    />
  );
};

export default ThemeSwitcher;
