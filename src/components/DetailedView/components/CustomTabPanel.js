import { Box } from "@mui/material";

import React from "react";

function CustomTabPanel(props) {
  const { children, visibleTabIndex, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={visibleTabIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {visibleTabIndex === index && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel;
