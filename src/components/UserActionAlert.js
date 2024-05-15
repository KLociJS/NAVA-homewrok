import { Alert, Box } from "@mui/material";

export default function UserActionAlert({
  message,
  isVisible,
  severity = "success",
}) {
  if (
    severity !== "success" &&
    severity !== "error" &&
    severity !== "warning" &&
    severity !== "info"
  ) {
    throw new Error("Invalid severity type");
  }
  return (
    <Box
      sx={{
        display: isVisible ? "flex" : "none",
        position: "fixed",
        bottom: {
          desktop: 0,
          mobile: 60,
          tablet: 60,
        },
        py: 4,
        width: {
          desktop: 1136,
          mobile: "calc(100% - 64px)",
          tablet: "calc(100% - 64px)",
        },
        justifyContent: "center",
      }}
    >
      <Alert variant='filled' severity={severity}>
        {message}
      </Alert>
    </Box>
  );
}
