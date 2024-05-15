import { useState } from "react";

function useToggleFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullscreenChange = () => {
    setIsFullScreen((prev) => !prev);
  };
  return { isFullScreen, handleFullscreenChange };
}

export default useToggleFullScreen;
