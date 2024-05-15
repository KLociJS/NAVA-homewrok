import { Box } from "@mui/material";
import React, { useState } from "react";
import { IS_API_RESPONSE_SUCCESSFUL } from "../../../constants/constants";
import { PublicImageDataContextProvider } from "../../../context/PublicImageDataContext";
import AkrLabels from "./AkrLabels";
import CustomTabPanel from "./CustomTabPanel";
import DateInPlaceEdit from "./InPlaceInput/DateInPlaceEdit";
import InPlaceEdit from "./InPlaceInput/InPlaceEdit";
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
  akrCodes: ["sport", "tennis", "gymnastics", "match", "competition"],
};

function PublicDataTabPanel({ visibleTabIndex, handleToggleAlertVisibility }) {
  const [publicData, setPublicData] = useState(mockData);

  return (
    <CustomTabPanel visibleTabIndex={visibleTabIndex} index={1}>
      <PublicImageDataContextProvider value={{ publicData, setPublicData }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SlugInPlaceEdit
            apiCallHandler={mockAPICall}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />
          <InPlaceEdit
            value={mockData.country}
            name='country'
            apiCallHandler={mockAPICall}
            inputType='text'
            iconSize={16}
            heading={"Country"}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            value={mockData.city}
            name='city'
            apiCallHandler={mockAPICall}
            inputType='text'
            iconSize={16}
            heading={"City"}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            value={mockData.description}
            name='description'
            apiCallHandler={mockAPICall}
            inputType='textarea'
            iconSize={16}
            heading={"Description"}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            value={mockData.city}
            name='background'
            apiCallHandler={mockAPICall}
            inputType='textarea'
            iconSize={16}
            heading={"Background"}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <DateInPlaceEdit
            apiCallHandler={mockAPICall}
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />
          <AkrLabels />
        </Box>
      </PublicImageDataContextProvider>
    </CustomTabPanel>
  );
}

const mockAPICall = (data, url) => {
  console.log("Sending data to " + url);
  console.log("Data: ", data);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (IS_API_RESPONSE_SUCCESSFUL) {
        resolve("Updated successfully.");
      } else {
        reject("Error saving data.");
      }
    }, 1000);
  });
};

export default PublicDataTabPanel;
