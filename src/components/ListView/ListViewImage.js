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
import { useImageDataContext } from "../../context/ImageDataContext";
import DetailedView from "../DetailedView/DetailedViewImage";
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

export default function ListViewImage() {
  const imgUrl = useMemo(() => {
    const randomWidth = Math.floor(Math.random() * 1300) + 600;
    const randomHeight = Math.floor(Math.random() * 1300) + 600;
    return `${IMG_API_URL}${randomWidth}/${randomHeight}`;
  }, []);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const data = useImageDataContext();

  const handleFullscreenChange = () => {
    setIsFullScreen((prev) => !prev);
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const cardStyle = {
    backgroundColor: "background.default",
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
      cursor: isFullScreen ? "auto" : "pointer",
      backgroundColor: "action.hover",
    },
  };

  return (
    <Card
      elevation={0}
      sx={cardStyle}
      onClick={handleFullscreenChange}
      tabIndex={0}
    >
      <Thumbnail title={data.description_str[0]} imgUrl={imgUrl} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 1,
        }}
      >
        <Header
          title={data.description_str[0]}
          createdAt={data.createDate_dt.slice(0, 10).replace(/-/g, "/")}
          updatedAt={data.harvestDate_dt.slice(0, 10).replace(/-/g, "/")}
        />

        <MetaDataList>
          {[
            data.id,
            data.filename_str[0],
            data.format_str[0],
            `${data.ow_i} x ${data.oh_i}`,
          ].map((data, index) => (
            <MetaDataListItem key={data.id} index={index} data={data} />
          ))}
        </MetaDataList>

        <ExpandableMetadataList expanded={expanded}>
          {[
            data.id,
            data.filename_str[0],
            data.format_str[0],
            `${data.ow_i} x ${data.oh_i}`,
          ].map((data, index) => (
            <MetaDataListItem key={data.id} index={index} data={data} />
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
        handleClose={handleFullscreenChange}
        imgUrl={imgUrl}
        data={data}
      />
    </Card>
  );
}
