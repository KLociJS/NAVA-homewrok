import { useCallback, useEffect, useState } from "react";
import { mockApiGetCall } from "../util/mockApiCall";

function useFetchImageData(pageCount) {
  const [response, setResponse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [availablePages, setAvailablePages] = useState(0);

  const fetchData = useCallback(() => {
    setIsLoaded(true);
    mockApiGetCall(`/api/image/${pageCount * 10}`)
      .then((response) => {
        setIsLoaded(false);
        setResponse(response.data);
        setAvailablePages(response.availablePages);
      })
      .catch((error) => {
        setIsLoaded(false);
        console.error("Error fetching data: ", error);
      });
  }, [pageCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { response, isLoaded, availablePages };
}

export default useFetchImageData;
