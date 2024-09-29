import React, { useState, createContext } from "react";

// Create a context with 'light' as the default value
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prevDark) => !prevDark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
