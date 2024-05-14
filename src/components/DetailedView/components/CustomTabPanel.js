import { Box } from "@mui/material";

import React from "react";

function CustomTabPanel(props) {
  const { children, currentVisibleIndex, index, ...other } = props;

  const customTabContainerStyle = {
    display: "flex",
    flexDirection: "column",
    p: 3,
  };

  return (
    <div
      role='tabpanel'
      hidden={currentVisibleIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {currentVisibleIndex === index && (
        <Box sx={customTabContainerStyle}>{children}</Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
