import { Alert, Box } from "@mui/material";

export default function UserActionAlert({ message, sx, severity = "success" }) {
  if (
    severity !== "success" &&
    severity !== "error" &&
    severity !== "warning" &&
    severity !== "info"
  ) {
    throw new Error("Invalid severity type");
  }

  return (
    <Box sx={sx}>
      <Alert variant='filled' severity={severity}>
        {message}
      </Alert>
    </Box>
  );
}
