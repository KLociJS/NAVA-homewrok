import { Container, CssBaseline, ThemeProvider } from "@mui/material";

import { useEffect, useState } from "react";
import PreviewImage from "./components/ListView/PreviewImage";
import SearchInput from "./components/SearchInput/SearchInput";
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
        {response.map((image) => (
          <PreviewImage
            key={image.id}
            title={image.description_str[0]}
            createdAt={image.createDate_dt.slice(0, 10).replace(/-/g, "/")}
            updatedAt={image.harvestDate_dt.slice(0, 10).replace(/-/g, "/")}
            metadata={[
              image.id,
              image.filename_str[0],
              image.format_str[0],
              `${image.ow_i} x ${image.oh_i}`,
            ]}
          />
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default App;
