import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";
import formatDate from "../../../../util/formatDate";
import useInPlaceInput from "./hooks/useInPlaceInput";

function DateInPlaceEdit({ apiCallHandler, handleToggleAlertVisibility }) {
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
  } = useInPlaceInput(dayjs(publicData.captureDate));

  const handleSave = () => {
    setIsLoading(true);
    apiCallHandler({ captureDate: data }, `api/public/capture-date`)
      .then((res) => {
        console.log(res);
        setPublicData((prev) => ({ ...prev, captureDate: data }));
        handleToggleEditVisibility();
        handleToggleAlertVisibility("Capture date was updated successfully.");
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <Typography
            variant='overline'
            gutterBottom
            sx={{
              color: "text.secondary",
              marginBlock: 0,
            }}
          >
            Capture Date
          </Typography>
          <IconButton onClick={handleToggleEditVisibility}>
            <MdEdit size={16} />
          </IconButton>
        </Box>

        <Box sx={{ width: 1 }}>
          <Typography
            variant='body1'
            sx={{
              width: "30ch",
            }}
          >
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
        <Typography
          variant='overline'
          gutterBottom
          sx={{
            color: "text.secondary",
            marginBlock: 0,
          }}
        >
          Capture Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(date) => handleInputChange(date)}
            value={data}
            sx={{
              width: 1,
              borderColor: hasError ? "error.main" : "text.primary",
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: hasError ? "1px solid red" : "1px solid gray",
              },
            }}
            error={hasError}
          />
          <Typography variant='body2' color='error'>
            {hasError ? "Error saving date." : ""}
          </Typography>
        </LocalizationProvider>

        <Box
          sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 1 }}
        >
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
    </Box>
  );
}

export default DateInPlaceEdit;
