import { useState } from "react";
import { mockPatchDeleteCall } from "../../../util/mockApiCall";

function useDeleteImage(
  data,
  handleClose,
  handleToggleAlertVisibility,
  handleToggleDialog
) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);

    mockPatchDeleteCall(
      `api/image/${data.id}`,
      "DELETE",
      "Error deleting image.",
      "Image was deleted successfully."
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error deleting image.");
        handleClose();
        handleToggleAlertVisibility(res.message);
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
        handleToggleAlertVisibility(error.message, "error");
      })
      .finally(() => {
        handleToggleDialog();
        setIsLoading(false);
      });
  };

  return { isLoading, handleDelete };
}

export default useDeleteImage;
