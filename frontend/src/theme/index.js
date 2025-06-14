import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff1a1a",
      success: "#009900",
      error: "#ff0000",
      white: "#ffffff",
      black: "#000000",
      nav:"#7a9c59",
      coal: "#2E2E2E"
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily:'roboto, sans-serif',    
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: "bold",
    },
    
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
  },
  
});

export default theme;
