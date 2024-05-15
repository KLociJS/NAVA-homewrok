import { Chip, Divider, List, ListItem } from "@mui/material";
import React from "react";
import { usePublicImageDataContext } from "../../../context/PublicImageDataContext";

function AkrLabels() {
  const { publicData } = usePublicImageDataContext();
  return (
    <>
      <Divider variant='fullWidth' />
      <List
        sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", gap: 1 }}
      >
        {publicData.akrCodes.map((label) => (
          <ListItem key={label} sx={{ width: "auto", padding: 0 }}>
            <Chip label={label} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default AkrLabels;
