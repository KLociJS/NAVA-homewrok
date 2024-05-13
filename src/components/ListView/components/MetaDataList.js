import { List } from "@mui/material";
import React from "react";

function MetaDataList({ children }) {
  const metaDataListStyle = {
    display: {
      desktop: "flex",
      tablet: "none",
      mobile: "none",
    },
    gap: 4,
    px: 2,
    pt: 0,
    pb: 1,
  };

  return (
    <List disablePadding={true} sx={metaDataListStyle}>
      {children}
    </List>
  );
}

export default MetaDataList;
