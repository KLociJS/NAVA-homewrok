import { useState } from "react";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../constants/constants";

function useAlertHook() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState();

  const handleToggleAlertVisibility = (message, severity = "success") => {
    setIsAlertVisible(true);
    setSeverity(severity);
    setMessage(message);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, SNACKBAR_AUTO_HIDE_DURATION);
  };
  return { isAlertVisible, handleToggleAlertVisibility, severity, message };
}

export default useAlertHook;
