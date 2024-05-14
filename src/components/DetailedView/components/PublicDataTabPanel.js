import { Box } from "@mui/material";
import React, { useState } from "react";
import { PublicImageDataContextProvider } from "../../../context/PublicImageDataContext";
import CustomTabPanel from "./CustomTabPanel";
import InPlaceEdit from "./InPlaceEdit";
import SlugInPlaceEdit from "./InPlaceInput/SlugInPlaceEdit";

const mockData = {
  slug: "Tennis, Moscow gymnastics",
  country: "Russia",
  city: "Moscow",
  description:
    "A person is standing on a cliff. The sun is setting, painting the sky  with warm colors. Waves are crashing against the rocks below.",
  background:
    "At sunset, Sarah stands by the sea, contemplating life's journey amid the soothing rhythm of waves.",
  captureDate: "2023-03-19T02:36:57Z",
  photographer: "Szergej Ilnyickij",
  inviduals: "Sarah",
};

const mockAPICall = (data, url) => {
  console.log("Sending data to " + url);
  console.log("Data: ", data);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data saved on server");
    }, 1000);
  });
};

function PublicDataTabPanel({ currentVisibleIndex }) {
  const [publicData, setPublicData] = useState(mockData);

  return (
    <CustomTabPanel currentVisibleIndex={currentVisibleIndex} index={1}>
      <PublicImageDataContextProvider value={{ publicData, setPublicData }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SlugInPlaceEdit apiCallHandler={mockAPICall} />
          <InPlaceEdit
            value={mockData.country}
            name='country'
            apiCallHandler={mockAPICall}
            inputType='text'
            iconSize={16}
            heading={"Country"}
          />

          <InPlaceEdit
            value={mockData.city}
            name='city'
            apiCallHandler={mockAPICall}
            inputType='text'
            iconSize={16}
            heading={"City"}
          />

          <InPlaceEdit
            value={mockData.description}
            name='description'
            apiCallHandler={mockAPICall}
            inputType='textarea'
            iconSize={16}
            heading={"Description"}
          />

          <InPlaceEdit
            value={mockData.city}
            name='background'
            apiCallHandler={mockAPICall}
            inputType='textarea'
            iconSize={16}
            heading={"Background"}
          />
        </Box>
      </PublicImageDataContextProvider>
    </CustomTabPanel>
  );
}

export default PublicDataTabPanel;
