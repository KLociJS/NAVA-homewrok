import { Box } from "@mui/material";
import React, { useState } from "react";
import { PublicImageDataContextProvider } from "../../../context/PublicImageDataContext";
import AkrLabels from "./AkrLabels";
import CustomTabPanel from "./CustomTabPanel";
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
    <CustomTabPanel visibleTabIndex={visibleTabIndex} index={1} sx={{ w: 1 }}>
      <PublicImageDataContextProvider value={{ publicData, setPublicData }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SlugInPlaceEdit
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />
          <InPlaceEdit
            name='country'
            inputType='text'
            iconSize={16}
            heading='Country'
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            name='city'
            inputType='text'
            iconSize={16}
            heading='City'
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            name='description'
            inputType='textarea'
            iconSize={16}
            heading='Description'
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            name='background'
            inputType='textarea'
            iconSize={16}
            heading='Background'
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <InPlaceEdit
            name='captureDate'
            inputType='date'
            iconSize={16}
            heading='Capture Date'
            handleToggleAlertVisibility={handleToggleAlertVisibility}
          />

          <AkrLabels />
        </Box>
      </PublicImageDataContextProvider>
    </CustomTabPanel>
  );
}

export default PublicDataTabPanel;
