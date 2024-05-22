import {
  Box,
  Container,
  CssBaseline,
  Pagination,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import ListViewImage from "./components/ListView/ListViewImage";
import DesktopSkeleton from "./components/ListView/components/skeleton/DesktopSkeleton";
import MobileSkeleton from "./components/ListView/components/skeleton/MobileSkeleton";
import TabletSkeleton from "./components/ListView/components/skeleton/TabletSkeleton";
import SearchInput from "./components/SearchInput/SearchInput";
import UserActionAlert from "./components/UserActionAlert";
import { ImageDataContextProvider } from "./context/ImageDataContext";
import { UserActionAlertContextProvider } from "./context/UserActionAlertContext";
import useAlertHook from "./hooks/useAlertHook";
import useFetchImageData from "./hooks/useFetchImageData";
import usePagination from "./hooks/usePagination";
import theme from "./style";

function App() {
  const { pageCount, handlePageChange } = usePagination();
  const { response, isLoaded } = useFetchImageData(pageCount);

  const { isAlertVisible, handleToggleAlertVisibility, severity, message } =
    useAlertHook();

  const ids = response.map((data) => data.id);
  //check if there are matching ids
  if (ids.length !== new Set(ids).size) {
    console.log("There are duplicate ids in the response data.");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchInput />
      <Container
        component='main'
        sx={{
          display: "flex",
          gap: { mobile: 1, tablet: 1, desktop: 0 },
          flexWrap: "wrap",
          px: 4,
          py: 2,
          maxWidth: 1200,
          position: "relative",
        }}
      >
        {isLoaded ? (
          <Box
            sx={{
              px: { desktop: 3 },
            }}
          >
            <DesktopSkeleton />
            <TabletSkeleton />
            <MobileSkeleton />
          </Box>
        ) : (
          <>
            <UserActionAlertContextProvider
              value={{ handleToggleAlertVisibility }}
            >
              {response.map((data) => (
                <ImageDataContextProvider value={data}>
                  <ListViewImage />
                </ImageDataContextProvider>
              ))}
            </UserActionAlertContextProvider>
            <Box sx={{ width: 1, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={10}
                page={pageCount}
                onChange={handlePageChange}
              />
            </Box>
            <UserActionAlert
              severity={severity}
              message={message}
              sx={{
                display: isAlertVisible ? "flex" : "none",
                position: "fixed",
                bottom: {
                  desktop: 0,
                  mobile: 60,
                  tablet: 60,
                },
                py: 4,
                width: 1200,
                justifyContent: "center",
                zIndex: theme.zIndex.snackbar,
              }}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
