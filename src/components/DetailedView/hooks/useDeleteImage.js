import { useState } from "react";
import { IS_API_RESPONSE_SUCCESSFUL } from "../../../constants/constants";

function useDeleteImage(
  data,
  handleClose,
  handleToggleSuccessAlert,
  handleToggleAlertVisibility,
  handleToggleDialog
) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    console.log(`sending delete request to url: api/image/${data.id}`);
    setIsLoading(true);

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (IS_API_RESPONSE_SUCCESSFUL) {
          resolve("Data deleted on server");
        } else {
          reject("Error deleting image");
        }
      }, 1000);
    })
      .then((res) => {
        console.log(res);
        handleClose();
        handleToggleSuccessAlert("Image was successfully deleted.");
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
        handleToggleAlertVisibility("Couldn't delete image.", "error");
      })
      .finally(() => {
        handleToggleDialog();
        setIsLoading(false);
      });
  };

  return { isLoading, handleDelete };
}

export default useDeleteImage;
