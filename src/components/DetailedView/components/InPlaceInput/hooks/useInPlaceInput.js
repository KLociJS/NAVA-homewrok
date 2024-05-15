import { useState } from "react";

function useInPlaceInput(value) {
  const [data, setData] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleToggleEditVisibility = () => {
    setIsEditing((prev) => !prev);
    setHasError(false);
  };

  const handleInputChange = (date) => {
    setData(date);
  };
  return {
    data,
    isEditing,
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    handleToggleEditVisibility,
    handleInputChange,
  };
}

export default useInPlaceInput;
