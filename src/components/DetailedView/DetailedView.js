import { Box, Grow } from "@mui/material";
import React from "react";

function DetailedView({ isFullScreen, handleChange }) {
  return (
    <Grow in={isFullScreen}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          backgroundColor: "primary.main",
          zIndex: 99,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleChange}>close</button>
      </Box>
    </Grow>
  );
}

export default DetailedView;
