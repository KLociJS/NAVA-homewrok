import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";

function SlugInPlaceEdit({ apiCallHandler, handleToggleAlertVisibility }) {
  const { publicData, setPublicData } = usePublicImageDataContext();

  const [data, setData] = useState(publicData.slug);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleEditVisibilityToggle = () => {
    setIsEditing((prev) => !prev);
    setHasError(false);
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSave = () => {
    setIsLoading(true);
    apiCallHandler({ slug: data }, `api/public/slug`)
      .then((res) => {
        console.log(res);
        setPublicData((prev) => ({ ...prev, slug: data }));
        handleEditVisibilityToggle();
        handleToggleAlertVisibility("Slug was updated successfully.");
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const headingStyle = {
    color: "text.primary",
    marginBlock: 0,
  };

  return (
    <>
      <Box
        sx={{
          display: isEditing ? "none" : "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='h6' sx={headingStyle}>
            {publicData.slug}
          </Typography>
          <IconButton onClick={handleEditVisibilityToggle}>
            <MdEdit size={20} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: isEditing ? "flex" : "none",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <TextField
          value={data}
          onChange={handleInputChange}
          variant='outlined'
          label='Slug'
          sx={{ width: 1, mt: 1 }}
          error={hasError}
          helperText={hasError ? "Error saving slug" : ""}
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button
            variant='outlined'
            onClick={handleEditVisibilityToggle}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SlugInPlaceEdit;
