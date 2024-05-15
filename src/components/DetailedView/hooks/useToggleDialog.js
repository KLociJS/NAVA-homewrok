import { useState } from "react";

export default function useToggleDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };
  return {
    isDialogOpen,
    handleToggleDialog,
  };
}
