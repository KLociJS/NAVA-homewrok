import { useState } from "react";

function useChangeTab() {
  const [visibleTabIndex, setVisibleTabIndex] = useState(0);
  const handleChangeTab = (_, newValue) => {
    setVisibleTabIndex(newValue);
  };
  return {
    handleChangeTab,
    visibleTabIndex,
  };
}

export default useChangeTab;
