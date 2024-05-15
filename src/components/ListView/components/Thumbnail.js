import { useTheme } from "@emotion/react";
import { CardMedia } from "@mui/material";
import React from "react";

function Thumbnail({ title, imgUrl }) {
  const theme = useTheme();

  return (
    <CardMedia
      component='img'
      image={imgUrl}
      alt={title}
      sx={{
        maxWidth: {
          mobile: "100%",
          tablet: "100%",
          desktop: 180,
        },
        height: {
          mobile: 200,
          tablet: 200,
          desktop: 125,
        },
        objectFit: "cover",
        alignSelf: "center",
        borderRadius: 1,
        "&:hover": {
          desktop: {
            transform: "scale(1.25)",
          },
        },
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeInOut,
        }),
      }}
    />
  );
}

export default Thumbnail;
