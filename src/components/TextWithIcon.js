import { Box } from "@mui/material";
import React from "react";

function TextWithIcon({ children }) {
  const textWithIconContainerStyle = {
    display: "flex",
    gap: 0.5,
    alignItems: "center",
  };
  return <Box sx={textWithIconContainerStyle}>{children}</Box>;
}

export default TextWithIcon;
