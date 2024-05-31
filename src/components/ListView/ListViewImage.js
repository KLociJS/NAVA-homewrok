import {
  Box,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  styled,
} from "@mui/material";

import React, { useMemo } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { useImageDataContext } from "../../context/ImageDataContext";
import DetailedView from "../DetailedView/DetailedViewImage";
import ExpandableMetadataList from "./components/ExpandableMetadataList";
import Header from "./components/Header";
import MetaDataList from "./components/MetaDataList";
import MetaDataListItem from "./components/MetaDataListItem";
import Thumbnail from "./components/Thumbnail";
import useExpand from "./hooks/useExpand";
import useToggleFullScreen from "./hooks/useToggleFullScreen";

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
    const randomWidth = Math.floor(Math.random() * (1500 - 1200 + 1)) + 1200;
    const randomHeight = Math.floor(Math.random() * (1500 - 1200 + 1)) + 1200;
    return `${process.env.REACT_APP_IMG_API_URL}${randomWidth}/${randomHeight}`;
  }, []);

  const { isFullScreen, handleFullscreenChange } = useToggleFullScreen();
  const { expanded, handleExpand } = useExpand();

  const data = useImageDataContext();

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
            <MetaDataListItem key={data} index={index} data={data} />
          ))}
        </MetaDataList>

        <ExpandableMetadataList expanded={expanded}>
          {[
            data.id,
            data.filename_str[0],
            data.format_str[0],
            `${data.ow_i} x ${data.oh_i}`,
          ].map((data, index) => (
            <MetaDataListItem key={data} index={index} data={data} />
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
            onClick={(e) => handleExpand(e)}
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
      <Dialog open={isFullScreen} fullScreen>
        <DialogContent
          sx={{
            overflowY: "scroll",
            backgroundColor: "background.default",
            p: { mobile: 0, tablet: 0, desktop: 3 },
          }}
        >
          <DetailedView
            isFullScreen={isFullScreen}
            handleClose={handleFullscreenChange}
            imgUrl={imgUrl}
            data={data}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
