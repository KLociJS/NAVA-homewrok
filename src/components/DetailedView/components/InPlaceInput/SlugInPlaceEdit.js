import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";

function SlugInPlaceEdit({ apiCallHandler }) {
  const { publicData, setPublicData } = usePublicImageDataContext();

  const [data, setData] = useState(publicData.slug);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditVisibilityChange = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSave = () => {
    apiCallHandler({ slug: data }, `api/public/slug`)
      .then((res) => {
        console.log(res);
        setPublicData((prev) => ({ ...prev, slug: data }));
        handleEditVisibilityChange();
      })
      .catch((error) => {
        console.log(error);
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
          <IconButton onClick={handleEditVisibilityChange}>
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
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button variant='outlined' onClick={handleEditVisibilityChange}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default SlugInPlaceEdit;
