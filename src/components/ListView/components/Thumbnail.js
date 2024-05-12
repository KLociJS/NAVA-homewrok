import { useTheme } from "@emotion/react";
import { CardMedia } from "@mui/material";
import React from "react";

function Thumbnail({ title, imgUrl }) {
  const theme = useTheme();

  const cardMediaStyle = {
    maxWidth: 128,
    height: 125,
    borderRadius: 1,
    "&:hover": {
      transform: "scale(1.25)",
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  };

  return (
    <CardMedia component='img' image={imgUrl} alt={title} sx={cardMediaStyle} />
  );
}

export default Thumbnail;
