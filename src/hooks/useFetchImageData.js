import { useCallback, useEffect, useState } from "react";
import { mockApiGetCall } from "../util/mockApiCall";

function useFetchImageData(pageCount) {
  const [response, setResponse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoaded(true);
    mockApiGetCall(`/api/image/${pageCount * 10}`)
      .then((data) => {
        setIsLoaded(false);
        setResponse(data);
      })
      .catch((error) => {
        setIsLoaded(false);
        console.error("Error fetching data: ", error);
      });
  }, [pageCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return { response, isLoaded };
}

export default useFetchImageData;
