import { Box } from "@mui/material";

import React from "react";

function CustomTabPanel(props) {
  const { children, visibleTabIndex, index, ...other } = props;

  const customTabContainerStyle = {
    display: "flex",
    flexDirection: "column",
    p: 3,
  };

  return (
    <div
      role='tabpanel'
      hidden={visibleTabIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {visibleTabIndex === index && (
        <Box sx={customTabContainerStyle}>{children}</Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
