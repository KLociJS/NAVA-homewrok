import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      desktop: 1100,
    },
  },
  palette: {
    common: {
      white: "#eff1f3",
    },
    background: {
      default: "#EFF1F3",
    },
    warning: {
      main: "#f44336",
    },
  },
});

export default theme;
