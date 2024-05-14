import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../context/PublicImageDataContext";
import TextArea from "./InPlaceInput/Textarea";

function InPlaceEdit({
  heading,
  apiCallHandler,
  name,
  inputType,
  iconSize = 20,
}) {
  if (inputType !== "text" && inputType !== "textarea") {
    throw new Error("Invalid input type");
  }

  const { publicData, setPublicData } = usePublicImageDataContext();

  const [data, setData] = useState(publicData[name]);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditVisibilityChange = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const handleSave = () => {
    apiCallHandler({ [name]: data }, `api/public/${name}`)
      .then((res) => {
        console.log(res);
        setPublicData((prev) => ({ ...prev, [name]: data }));
        handleEditVisibilityChange();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const headingStyle = {
    color: "text.secondary",
    marginBlock: 0,
  };
  const contentStyle = {
    width: "30ch",
  };

  return (
    <Box>
      <Divider variant='fullWidth' />

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
          <Typography variant='overline' gutterBottom sx={headingStyle}>
            {heading}
          </Typography>
          <IconButton onClick={handleEditVisibilityChange}>
            <MdEdit size={iconSize} />
          </IconButton>
        </Box>

        <Box sx={{ width: 1 }}>
          <Typography variant='body1' sx={contentStyle}>
            {publicData[name]}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: isEditing ? "flex" : "none",
          flexDirection: "column",
          maxWidth: "320px",
        }}
      >
        {inputType === "text" ? (
          <>
            <Typography variant='overline' gutterBottom sx={headingStyle}>
              {heading}
            </Typography>
            <TextField
              value={data}
              onChange={handleInputChange}
              variant='outlined'
              sx={{ width: 1 }}
            />
          </>
        ) : (
          <>
            <Typography variant='overline' gutterBottom sx={headingStyle}>
              {heading}
            </Typography>
            <TextArea value={data} onChange={handleInputChange} label={name} />
          </>
        )}
        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}
        >
          <Button variant='outlined' onClick={handleEditVisibilityChange}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default InPlaceEdit;
