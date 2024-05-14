import { Box, Skeleton } from "@mui/material";
import React from "react";

function TabletSkeleton() {
  return (
    <Box
      sx={{
        display: { mobile: "none", tablet: "flex", desktop: "none" },
        justifyContent: { tablet: "space-between" },
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {[...Array(6)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* Thumbnail */}
          <Skeleton variant='rounded' width={"42vw"} height={200} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Header */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Skeleton variant='rounded' width={"40vw"} height={24} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton variant='rounded' width={100} height={20} />
                <Skeleton variant='rounded' width={100} height={20} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TabletSkeleton;
