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
    background: {
      default: "#EFF1F3",
    },
  },
});

export default theme;
