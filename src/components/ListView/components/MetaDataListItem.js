import { ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { CiFileOn, CiImageOn } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { RxSize } from "react-icons/rx";
import TextWithIcon from "../../TextWithIcon";

const metaDataTypes = [
  {
    icon: <IoKeyOutline />,
    text: "ID",
  },
  {
    icon: <CiFileOn />,
    text: "File Name",
  },
  {
    icon: <CiImageOn />,
    text: "Media Type",
  },
  {
    icon: <RxSize />,
    text: "Resolution",
  },
];

function MetaDataListItem({ index, data }) {
  return (
    <ListItem
      sx={{
        gap: 0.5,
        padding: 0,
        flexBasis: "100%",
      }}
    >
      <ListItemText
        sx={{
          textWrap: "nowrap",
        }}
        secondary={data}
        primary={
          <TextWithIcon>
            {metaDataTypes[index].icon}
            <Typography variant='body2'>{metaDataTypes[index].text}</Typography>
          </TextWithIcon>
        }
      />
    </ListItem>
  );
}

export default MetaDataListItem;
