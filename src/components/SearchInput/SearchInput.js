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
import React from "react";
import { MdOutlineFilterAlt } from "react-icons/md";
import useToggle from "../../hooks/useToggle";
import useInput from "./hooks/useInput";

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
    px: { desktop: 6.75, tablet: 4 },
    py: 4,
  };

  const searchContainerStyle = {
    display: "flex",
    justifyContent: "center",
    minHeight: "3rem",
    boxShadow: 1,
  };

  const {
    searchType,
    searchTextValue,
    searchDateValue,
    handleTypeChange,
    handleTextInputChange,
    handleDateInputChange,
  } = useInput();

  const { value: show, toggle: handleToggleFilter } = useToggle(false);

  return (
    <Box component='header' sx={searchContainerStyle}>
      <IconButton
        onClick={handleToggleFilter}
        sx={{
          display: { mobile: "block", tablet: "none" },
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <MdOutlineFilterAlt size={32} />
      </IconButton>
      <Drawer anchor='top' open={show} onClose={handleToggleFilter}>
        <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl variant='outlined' fullWidth>
            <InputLabel id='search-type-input-label'>Filter Type</InputLabel>
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
              label='Filter'
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
          <InputLabel id='search-type-input-label'>Filter Type</InputLabel>
          <Select
            labelId='search-type-input-label'
            id='search-type-select'
            value={searchType}
            label='Filter Type'
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
            label='Filter'
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
