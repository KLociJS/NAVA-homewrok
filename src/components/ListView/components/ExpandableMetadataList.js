import { Collapse, List } from "@mui/material";
import React from "react";

function ExpandableMetadataList({ children, expanded }) {
  const metaDataListStyle = {
    display: {
      mobile: "flex",
      tablet: "flex",
      desktop: "none",
    },
    gap: 4,
    px: 2,
    pt: 0,
    pb: 1,
  };

  return (
    <List disablePadding={true} sx={metaDataListStyle}>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </List>
  );
}

export default ExpandableMetadataList;
