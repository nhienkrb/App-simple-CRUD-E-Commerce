import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff1a1a",
      sucess: "#009900",
      error: "#ff0000",
      white: "#ffffff",
      black: "#000000",
      nav:"#7a9c59"

    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    
  },
  
});

export default theme;
