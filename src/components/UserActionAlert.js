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
        bottom: 24,
        width: "min(100vw,1200px)",
        justifyContent: "center",
      }}
    >
      <Alert variant='filled' severity={severity}>
        {message}
      </Alert>
    </Box>
  );
}
