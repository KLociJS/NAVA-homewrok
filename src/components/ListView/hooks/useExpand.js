import { useState } from "react";

function useExpand() {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  return { expanded, handleExpand };
}

export default useExpand;
