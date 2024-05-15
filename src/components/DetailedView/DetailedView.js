import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { MdClose, MdDelete, MdNavigateBefore } from "react-icons/md";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleOverlayClose = (e) => {
    e.stopPropagation();
    handleClose();
  };

  const handleDelete = () => {
    console.log(`sending delete request to url: api/image/${data.id}`);

    new Promise((resolve) => {
      setTimeout(() => {
        resolve("Data deleted on server");
      }, 1000);
    }).then((res) => {
      console.log(res);
      handleDialogToggle();
      handleClose();
    });
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
    backgroundColor: "background.default",
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

  return (
    <Grow in={isFullScreen}>
      <Box sx={detailedViewOverlyStyle} onClick={(e) => handleOverlayClose(e)}>
        <Box sx={detailedViewContentStyle} onClick={(e) => e.stopPropagation()}>
          <IconButton
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
            }}
            onClick={handleClose}
          >
            <MdClose size={30} />
          </IconButton>
          <Box sx={imageContainerStyle}>
            <img
              src={imgUrl}
              alt={data.description_str[0]}
              style={{
                maxWidth: "100%",
                objectFit: "contain",
                borderRadius: 4,
              }}
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
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 3 }}
            >
              <Button
                variant='contained'
                color='error'
                startIcon={<MdDelete />}
                onClick={handleDialogToggle}
              >
                Delete
              </Button>
              <Button
                variant='outlined'
                color='primary'
                startIcon={<MdNavigateBefore />}
                onClick={handleClose}
              >
                Back
              </Button>
            </Box>
            <Dialog
              open={isDialogOpen}
              onClose={handleDialogToggle}
              aria-labelledby='delete image dialog'
              aria-describedby='deleting image confirmation dialog'
            >
              <DialogTitle id='alert-dialog-title'>Delete Image</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Are you sure you want to delete this image?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogToggle} variant='outlined'>
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  variant='contained'
                  color='error'
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
}

export default DetailedView;
