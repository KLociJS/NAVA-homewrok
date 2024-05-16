import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";
import { mockPatchDeleteCall } from "../../../../util/mockApiCall";
import useInPlaceInput from "./hooks/useInPlaceInput";

function SlugInPlaceEdit({ handleToggleAlertVisibility }) {
  const { publicData, setPublicData } = usePublicImageDataContext();

  const {
    data,
    isEditing,
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    handleToggleEditVisibility,
    handleInputChange,
  } = useInPlaceInput(publicData.slug);

  const handleSave = () => {
    setIsLoading(true);
    mockPatchDeleteCall(
      `api/image/slug/${data.id}`,
      "PATCH",
      "",
      "Slug was saved successfully.",
      data
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error saving data.");
        setPublicData((prev) => ({ ...prev, slug: data }));
        handleToggleEditVisibility();
        handleToggleAlertVisibility(res.message);
      })
      .catch((error) => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <Typography
            variant='h6'
            sx={{
              color: "text.primary",
              marginBlock: 0,
            }}
          >
            {publicData.slug}
          </Typography>
          <IconButton onClick={handleToggleEditVisibility}>
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
          onChange={(e) => handleInputChange(e.target.value)}
          variant='outlined'
          label='Slug'
          sx={{ width: 1, mt: 1 }}
          error={hasError}
          helperText={hasError ? "Error saving slug" : ""}
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button
            variant='outlined'
            onClick={handleToggleEditVisibility}
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
