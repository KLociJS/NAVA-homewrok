import { Box, Button, Grow, IconButton, Tab, Tabs } from "@mui/material";
import React from "react";
import { MdClose, MdDelete, MdNavigateBefore } from "react-icons/md";
import { useImageDataContext } from "../../context/ImageDataContext";
import { useUserActionAlertContext } from "../../context/UserActionAlertContext";
import useAlertHook from "../../hooks/useAlertHook";
import UserActionAlert from "../UserActionAlert";
import DeleteDialog from "./components/DeleteDialog";
import MetaDataTabPanel from "./components/MetaDataTabPanel";
import PublicDataTabPanel from "./components/PublicDataTabPanel";
import useChangeTab from "./hooks/useChangeTab";
import useDeleteImage from "./hooks/useDeleteImage";
import useToggleDialog from "./hooks/useToggleDialog";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function DetailedViewImage({ isFullScreen, handleClose, imgUrl }) {
  const data = useImageDataContext();

  const { isDialogOpen, handleToggleDialog } = useToggleDialog();

  const { handleToggleAlertVisibility: handleToggleSuccessAlert } =
    useUserActionAlertContext();

  const { isAlertVisible, handleToggleAlertVisibility, severity, message } =
    useAlertHook();

  const { isLoading, handleDelete } = useDeleteImage(
    data,
    handleClose,
    handleToggleSuccessAlert,
    handleToggleAlertVisibility,
    handleToggleDialog
  );

  const { handleChangeTab, visibleTabIndex } = useChangeTab();

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
                value={visibleTabIndex}
                onChange={handleChangeTab}
                aria-label='meta and public data tabs'
              >
                <Tab label='Metadata' {...a11yProps(0)} />
                <Tab label='Public data' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <MetaDataTabPanel data={data} visibleTabIndex={visibleTabIndex} />
            <PublicDataTabPanel
              visibleTabIndex={visibleTabIndex}
              handleToggleAlertVisibility={handleToggleAlertVisibility}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", px: 3 }}
            >
              <Button
                variant='contained'
                color='error'
                startIcon={<MdDelete />}
                onClick={handleToggleDialog}
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
            <DeleteDialog
              isDialogOpen={isDialogOpen}
              handleDialogToggle={handleToggleDialog}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          </Box>
          <UserActionAlert
            isVisible={isAlertVisible}
            severity={severity}
            message={message}
          />
        </Box>
      </Box>
    </Grow>
  );
}

export default DetailedViewImage;