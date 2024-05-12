import { Box, Card, Divider } from "@mui/material";

import React, { useMemo, useState } from "react";
import { IMG_API_URL } from "../../constants/constants";
import DetailedView from "../DetailedView/DetailedView";
import Header from "./components/Header";
import MetaDataList from "./components/MetaDataList";
import MetaDataListItem from "./components/MetaDataListItem";
import Thumbnail from "./components/Thumbnail";

export default function PreviewImage({
  title,
  createdAt,
  updatedAt,
  metadata,
}) {
  const imgUrl = useMemo(() => {
    const randomWidth = Math.floor(Math.random() * 1300) + 600;
    const randomHeight = Math.floor(Math.random() * 1300) + 600;
    return `${IMG_API_URL}${randomWidth}/${randomHeight}`;
  }, []);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleChange = () => {
    setIsFullScreen((prev) => !prev);
  };
  const cardStyle = {
    display: "flex",
    flexGrow: 1,
    gap: 2,
    p: 2,
  };

  const cardDataContainerStyle = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: 1,
  };

  return (
    <Card elevation={0} sx={cardStyle} onClick={() => setIsFullScreen(true)}>
      <Thumbnail title={title} imgUrl={imgUrl} />

      <Box sx={cardDataContainerStyle}>
        <Header title={title} createdAt={createdAt} updatedAt={updatedAt} />

        <MetaDataList>
          {metadata.map((data, index) => (
            <MetaDataListItem key={index} index={index} data={data} />
          ))}
        </MetaDataList>

        <Divider variant='middle' />
      </Box>
      <DetailedView isFullScreen={isFullScreen} handleChange={handleChange} />
    </Card>
  );
}
