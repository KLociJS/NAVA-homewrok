import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export default function TextArea({
  value,
  onChange,
  label,
  error,
  helperText,
}) {
  return (
    <>
      <TextareaAutosize
        value={value}
        onChange={onChange}
        label={label}
        sx={{
          maxWidth: 320,
          py: 0.5,
          px: 2,
          borderRadius: 1,
          fontSize: 16,
          fontWeight: 400,
          borderColor: error ? "error.main" : "grey.300",
        }}
      />
      <Typography variant='body2' color='error'>
        {error && helperText}
      </Typography>
    </>
  );
}

// I can't fix this now, but I will try to fix it later
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  max-width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 0 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
