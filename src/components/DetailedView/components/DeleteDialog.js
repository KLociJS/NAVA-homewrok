import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

function DeleteDialog({
  isDialogOpen,
  handleDialogToggle,
  handleDelete,
  isLoading,
}) {
  return (
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
        <Button
          onClick={handleDialogToggle}
          variant='outlined'
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant='contained'
          color='error'
          disabled={isLoading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
