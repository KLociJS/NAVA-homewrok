import {
  Box,
  Card,
  CardActions,
  Divider,
  IconButton,
  styled,
} from "@mui/material";

import React, { useMemo, useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { IMG_API_URL } from "../../constants/constants";
import DetailedView from "../DetailedView/DetailedView";
import ExpandableMetadataList from "./components/ExpandableMetadataList";
import Header from "./components/Header";
import MetaDataList from "./components/MetaDataList";
import MetaDataListItem from "./components/MetaDataListItem";
import Thumbnail from "./components/Thumbnail";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PreviewImage({
  title,
  createdAt,
  updatedAt,
  metadata,
}) {
  const imgUrl = useMemo(() => {
    const randomWidth = Math.floor(Math.random() * 1300) + 600;
    const randomHeight = Math.floor(Math.random() * 1300) + 600;
    return `${IMG_API_URL}${randomWidth}/${randomHeight}`;
  }, []);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleFullscreenChange = () => {
    setIsFullScreen((prev) => !prev);
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const cardStyle = {
    display: "flex",
    flexDirection: {
      mobile: "column",
      tablet: "column",
      desktop: "row",
    },
    flexWrap: "wrap",
    flexGrow: 1,
    width: {
      mobile: 1,
      tablet: "45%",
      desktop: 1,
    },

    position: "relative",
    gap: 2,
    px: {
      mobile: 0,
      tablet: 0,
      desktop: 3,
    },
    py: {
      mobile: 0,
      tablet: 0,
      desktop: 1.75,
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "action.hover",
    },
  };

  const cardDataContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 1,
  };

  return (
    <Card
      elevation={0}
      sx={cardStyle}
      onClick={() => setIsFullScreen(true)}
      tabIndex={0}
    >
      <Thumbnail title={title} imgUrl={imgUrl} />

      <Box sx={cardDataContainerStyle}>
        <Header title={title} createdAt={createdAt} updatedAt={updatedAt} />

        <MetaDataList>
          {metadata.map((data, index) => (
            <MetaDataListItem key={index} index={index} data={data} />
          ))}
        </MetaDataList>
        <ExpandableMetadataList expanded={expanded}>
          {metadata.map((data, index) => (
            <MetaDataListItem key={index} index={index} data={data} />
          ))}
        </ExpandableMetadataList>

        <CardActions
          disableSpacing
          sx={{
            display: {
              tablet: "flex",
              desktop: "none",
              position: "absolute",
              right: 0,
            },
          }}
        >
          <ExpandMore
            expand={expanded}
            onClick={(e) => handleExpandClick(e)}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <MdOutlineExpandMore />
          </ExpandMore>
        </CardActions>
        <Divider
          variant='middle'
          sx={{ display: { mobile: "none", tablet: "none", desktop: "block" } }}
        />
      </Box>
      <DetailedView
        isFullScreen={isFullScreen}
        handleChange={handleFullscreenChange}
      />
    </Card>
  );
}
