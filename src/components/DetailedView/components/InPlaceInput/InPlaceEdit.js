import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { usePublicImageDataContext } from "../../../../context/PublicImageDataContext";
import { mockPatchDeleteCall } from "../../../../util/mockApiCall";
import TextArea from "./Textarea";
import useInPlaceInput from "./hooks/useInPlaceInput";

function InPlaceEdit({
  heading,
  name,
  inputType,
  handleToggleAlertVisibility,
  iconSize = 20,
}) {
  if (inputType !== "text" && inputType !== "textarea") {
    throw new Error("Invalid input type");
  }

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
  } = useInPlaceInput(publicData[name]);

  const handleSave = () => {
    setIsLoading(true);
    mockPatchDeleteCall(
      `api/image/${name}/${data.id}`,
      "PATCH",
      "",
      `${name.slice(0, 1).toUpperCase()}${name.slice(
        1
      )} was saved successfully.`,
      data
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error saving data.");
        setPublicData((prev) => ({ ...prev, [name]: data }));
        handleToggleEditVisibility();
        handleToggleAlertVisibility(res.message);
      })
      .catch((error) => {
        setHasError(true);
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
            {heading}
          </Typography>
          <IconButton onClick={handleToggleEditVisibility}>
            <MdEdit size={iconSize} />
          </IconButton>
        </Box>

        <Box sx={{ width: 1 }}>
          <Typography
            variant='body1'
            sx={{
              width: "30ch",
            }}
          >
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
            <Typography
              variant='overline'
              gutterBottom
              sx={{
                color: "text.secondary",
                marginBlock: 0,
              }}
            >
              {heading}
            </Typography>
            <TextField
              value={data}
              onChange={(e) => handleInputChange(e.target.value)}
              variant='outlined'
              sx={{ width: 1 }}
              error={hasError}
              helperText={hasError ? `Error saving ${name}` : ""}
            />
          </>
        ) : (
          <>
            <Typography
              variant='overline'
              gutterBottom
              sx={{
                color: "text.secondary",
                marginBlock: 0,
              }}
            >
              {heading}
            </Typography>
            <TextArea
              value={data}
              onChange={(e) => handleInputChange(e.target.value)}
              label={name}
              error={hasError}
              helperText={`Error saving ${name}`}
            />
          </>
        )}
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

export default InPlaceEdit;
