import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";
import formatDate from "../../../../util/formatDate";

function DateInPlaceEdit({ apiCallHandler }) {
  const { publicData, setPublicData } = usePublicImageDataContext();

  const [data, setData] = useState(dayjs(publicData.captureDate));
  const [isEditing, setIsEditing] = useState(false);

  const handleEditVisibilityChange = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (date) => {
    setData(date);
  };

  const handleSave = () => {
    apiCallHandler({ captureDate: data }, `api/public/capture-date`)
      .then((res) => {
        console.log(res);
        setPublicData((prev) => ({ ...prev, captureDate: data }));
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
            Capture Date
          </Typography>
          <IconButton onClick={handleEditVisibilityChange}>
            <MdEdit size={16} />
          </IconButton>
        </Box>

        <Box sx={{ width: 1 }}>
          <Typography variant='body1' sx={contentStyle}>
            {formatDate(publicData.captureDate)}
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
        <Typography variant='overline' gutterBottom sx={headingStyle}>
          Capture Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(date) => handleInputChange(date)}
            value={data}
            sx={{ width: 1 }}
          />
        </LocalizationProvider>

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

export default DateInPlaceEdit;
