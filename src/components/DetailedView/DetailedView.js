import { Box, Grow, IconButton, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useImageDataContext } from "../../context/ImageDataContext";
import MetaDataTabPanel from "./components/MetaDataTabPanel";
import PublicDataTabPanel from "./components/PublicDataTabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function DetailedView({ isFullScreen, handleClose, imgUrl }) {
  const [value, setValue] = useState(0);
  const data = useImageDataContext();

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleOverlayClose = (e) => {
    e.stopPropagation();
    handleClose();
  };

  const detailedViewOverlyStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    zIndex: 99,
    backgroundColor: "action.active",
    display: "flex",
    justifyContent: "center",
  };

  const detailedViewContentStyle = {
    position: "relative",
    maxWidth: 1200,
    width: 1,
    p: 4,
    display: "flex",
    gap: 2,
    flexDirection: {
      mobile: "column",
      tablet: "column",
      desktop: "row",
    },
    flexShrink: 1,
    overflowY: "auto",
    backgroundColor: "background.paper",
  };

  const closeButtonStyle = {
    position: "absolute",
    left: 0,
    top: 0,
  };

  const imageContainerStyle = {
    width: { mobile: 1, tablet: 1, desktop: 2 / 3 },
    display: "flex",
    justifyContent: "center",
    backgroundColor: "common.black",
    borderRadius: 1,
    maxHeight: {
      mobile: 500,
      tablet: 500,
      desktop: 800,
    },
  };

  const imageStyle = {
    maxWidth: "100%",
    objectFit: "contain",
    borderRadius: 4,
  };

  return (
    <Grow in={isFullScreen}>
      <Box sx={detailedViewOverlyStyle} onClick={(e) => handleOverlayClose(e)}>
        <Box sx={detailedViewContentStyle} onClick={(e) => e.stopPropagation()}>
          <IconButton sx={closeButtonStyle} onClick={handleClose}>
            <MdClose size={30} />
          </IconButton>
          <Box sx={imageContainerStyle}>
            <img
              src={imgUrl}
              alt={data.description_str[0]}
              style={imageStyle}
            />
          </Box>
          <Box sx={{ width: { desktop: "30%" } }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                aria-label='meta and public data tabs'
              >
                <Tab label='Metadata' {...a11yProps(0)} />
                <Tab label='Public data' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <MetaDataTabPanel data={data} currentVisibleIndex={value} />
            <PublicDataTabPanel currentVisibleIndex={value} />
          </Box>
        </Box>
      </Box>
    </Grow>
  );
}

export default DetailedView;
