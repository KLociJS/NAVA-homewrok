import { useTheme } from "@emotion/react";
import { Box, CardHeader, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { CiCalendar } from "react-icons/ci";
import { PiClockClockwise } from "react-icons/pi";
import TextWithIcon from "../../TextWithIcon";

function ListViewCardHeader({ title, createdAt, updatedAt }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("desktop"));

  const cardHeaderStyle = {
    px: 2,
    py: 0,
    fontSize: {
      mobile: 16,
      tablet: 16,
      desktop: 20,
    },
  };

  const cardSubheaderContainer = {
    display: "flex",
    gap: 2,
  };

  return (
    <CardHeader
      title={
        <Typography variant={isSmallScreen ? "h6" : "h5"}>{title}</Typography>
      }
      subheader={
        <Box sx={cardSubheaderContainer}>
          <TextWithIcon>
            <CiCalendar />
            <Typography variant='body2'>{createdAt}</Typography>
          </TextWithIcon>
          <TextWithIcon>
            <PiClockClockwise />
            <Typography variant='body2'>{updatedAt}</Typography>
          </TextWithIcon>
        </Box>
      }
      sx={cardHeaderStyle}
    />
  );
}

export default ListViewCardHeader;
