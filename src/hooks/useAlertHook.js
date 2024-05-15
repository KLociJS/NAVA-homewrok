import { useState } from "react";

function useAlertHook() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState();

  const handleToggleAlertVisibility = (message, severity = "success") => {
    console.log("message", message);
    setIsAlertVisible(true);
    setSeverity(severity);
    setMessage(message);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };
  return { isAlertVisible, handleToggleAlertVisibility, severity, message };
}

export default useAlertHook;
