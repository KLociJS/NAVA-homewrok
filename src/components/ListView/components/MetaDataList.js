import { List } from "@mui/material";
import React from "react";

function MetaDataList({ children }) {
  const metaDataListStyle = {
    display: "flex",
    gap: 4,
    pt: 0,
    pr: 2,
    pb: 1,
    pl: 2,
  };

  return (
    <List disablePadding={true} sx={metaDataListStyle}>
      {children}
    </List>
  );
}

export default MetaDataList;
