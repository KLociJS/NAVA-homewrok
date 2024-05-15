import {
  Box,
  Container,
  CssBaseline,
  Pagination,
  ThemeProvider,
} from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import PreviewImage from "./components/ListView/PreviewImage";
import DesktopSkeleton from "./components/ListView/components/skeleton/DesktopSkeleton";
import MobileSkeleton from "./components/ListView/components/skeleton/MobileSkeleton";
import TabletSkeleton from "./components/ListView/components/skeleton/TabletSkeleton";
import SearchInput from "./components/SearchInput/SearchInput";
import UserActionAlert from "./components/UserActionAlert";
import { ImageDataContextProvider } from "./context/ImageDataContext";
import { UserActionAlertContextProvider } from "./context/UserActionAlertContext";
import { getResponseData } from "./data/apiResponse";
import useAlertHook from "./hooks/useAlertHook";
import theme from "./style";

function App() {
  const [response, setResponse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(1);

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

  const { isAlertVisible, handleToggleAlertVisibility, severity, message } =
    useAlertHook();

  const mainContainerStyle = {
    display: "flex",
    gap: { mobile: 1, tablet: 1, desktop: 0 },
    flexWrap: "wrap",
    px: 4,
    py: 2,
    maxWidth: 1200,
    position: "relative",
  };

  const skeletonContainerStyle = {
    px: { desktop: 3 },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchInput />
      <Container component='main' sx={mainContainerStyle}>
        {isLoaded ? (
          <Box sx={skeletonContainerStyle}>
            <DesktopSkeleton />
            <TabletSkeleton />
            <MobileSkeleton />
          </Box>
        ) : (
          <>
            {response.map((data) => (
              <UserActionAlertContextProvider
                value={{ handleToggleAlertVisibility }}
              >
                <ImageDataContextProvider value={data}>
                  <PreviewImage key={data.id} />
                </ImageDataContextProvider>
              </UserActionAlertContextProvider>
            ))}
            <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={10}
                page={pageCount}
                onChange={handlePageChange}
              />
            </Box>
            <UserActionAlert
              severity={severity}
              isVisible={isAlertVisible}
              message={message}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
