import { Box } from "@mui/material";
import React from "react";

function TextWithIcon({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default TextWithIcon;
