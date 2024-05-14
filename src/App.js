import {
  Box,
  Container,
  CssBaseline,
  Pagination,
  ThemeProvider,
} from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import PreviewImage from "./components/ListView/PreviewImage";
import SearchInput from "./components/SearchInput/SearchInput";
import { ImageDataContextProvider } from "./context/ImageDataContext";
import { getResponseData } from "./data/apiResponse";
import theme from "./style";

function App() {
  const [response, setResponse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  console.log(response);

  const fetchData = useCallback(() => {
    setIsLoaded(true);
    getResponseData(pageCount * 10)
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

  const handlePageChange = (event, value) => {
    setPageCount(value);
  };

  const mainContainerStyle = {
    display: "flex",
    gap: { mobile: 1, tablet: 1, desktop: 0 },
    flexWrap: "wrap",
    px: 4,
    py: 2,
    maxWidth: 1200,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchInput />
      <Container component='main' sx={mainContainerStyle}>
        {isLoaded ? (
          <p>Loading...</p>
        ) : (
          <>
            {response.map((data) => (
              <ImageDataContextProvider value={data}>
                <PreviewImage key={data.id} />
              </ImageDataContextProvider>
            ))}
            <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={10}
                page={pageCount}
                onChange={handlePageChange}
              />
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
