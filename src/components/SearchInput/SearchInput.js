import {
  Box,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdOutlineFilterAlt } from "react-icons/md";

const searchTypes = [
  { value: "freeText", label: "Free text" },
  { value: "type", label: "Type" },
  { value: "format", label: "Format" },
  { value: "date", label: "Date" },
  { value: "prefix", label: "Prefix" },
];

function SearchInput() {
  const searchFormStyle = {
    display: {
      mobile: "none",
      tablet: "flex",
      desktop: "flex",
    },
    gap: 2,
    width: 1200,
    px: 5,
    py: 4,
  };

  const searchContainerStyle = {
    display: "flex",
    justifyContent: "center",
    minHeight: "3rem",
    boxShadow: 1,
  };

  const handleShowFilter = () => {
    setShow((prev) => !prev);
  };

  const [searchType, setSearchType] = useState("freeText");
  const [searchTextValue, setSearchTextValue] = useState();
  const [searchDateValue, setSearchDateValue] = useState(dayjs("2022-04-17"));
  const [show, setShow] = useState(false);

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setSearchTextValue(event.target.value);
  };

  const handleDateInputChange = (date) => {
    setSearchDateValue(date);
  };

  return (
    <Box component='header' sx={searchContainerStyle}>
      <IconButton
        onClick={handleShowFilter}
        sx={{
          display: { mobile: "block", tablet: "none" },
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <MdOutlineFilterAlt size={32} />
      </IconButton>
      <Drawer anchor='top' open={show} onClose={handleShowFilter}>
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel id='search-type-input-label'>Search Type</InputLabel>
            <Select
              labelId='search-type-input-label'
              id='search-type-select'
              value={searchType}
              label='Search Type'
              onChange={handleTypeChange}
            >
              {searchTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {searchType === "date" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(date) => handleDateInputChange(date)}
                value={searchDateValue}
                fullWidth
              />
            </LocalizationProvider>
          ) : (
            <TextField
              type='search'
              label='Search'
              onChange={handleTextInputChange}
              value={searchTextValue}
              autoFocus
              fullWidth
            />
          )}
        </Box>
      </Drawer>
      <Box component='form' sx={searchFormStyle}>
        <FormControl variant='outlined' sx={{ width: "30%" }}>
          <InputLabel id='search-type-input-label'>Search Type</InputLabel>
          <Select
            labelId='search-type-input-label'
            id='search-type-select'
            value={searchType}
            label='Search Type'
            onChange={handleTypeChange}
          >
            {searchTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {searchType === "date" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(date) => handleDateInputChange(date)}
              value={searchDateValue}
              sx={{ width: "70%" }}
            />
          </LocalizationProvider>
        ) : (
          <TextField
            type='search'
            label='Search'
            onChange={handleTextInputChange}
            value={searchTextValue}
            sx={{ width: "70%" }}
            autoFocus
          />
        )}
      </Box>
    </Box>
  );
}

export default SearchInput;
