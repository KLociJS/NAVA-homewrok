import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import { useEffect, useState } from "react";
import PreviewImage from "./components/ListView/PreviewImage";
import SearchInput from "./components/SearchInput/SearchInput";
import { ImageDataContextProvider } from "./context/ImageDataContext";
import { getResponseData } from "./data/apiResponse";
import theme from "./style";

function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const data = getResponseData(0);
    setResponse(data);
  }, []);

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
        }}
      >
        {response.map((data) => (
          <ImageDataContextProvider value={data}>
            <PreviewImage key={data.id} />
          </ImageDataContextProvider>
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default App;
