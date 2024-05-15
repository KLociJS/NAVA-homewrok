import { useState } from "react";

function usePagination() {
  const [pageCount, setPageCount] = useState(1);
  const handlePageChange = (_, value) => {
    setPageCount(value);
  };
  return { pageCount, handlePageChange };
}

export default usePagination;
