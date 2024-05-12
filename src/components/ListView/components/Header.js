import { Box, CardHeader, Typography } from "@mui/material";
import React from "react";
import { HiOutlineClock } from "react-icons/hi2";
import { PiClockClockwise } from "react-icons/pi";
import TextWithIcon from "../../TextWithIcon";

function ListViewCardHeader({ title, createdAt, updatedAt }) {
  const cardHeaderStyle = {
    px: 2,
    py: 0,
  };

  const cardSubheaderContainer = {
    display: "flex",
    gap: 2,
  };

  return (
    <CardHeader
      title={title}
      subheader={
        <Box sx={cardSubheaderContainer}>
          <TextWithIcon>
            <HiOutlineClock />
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
