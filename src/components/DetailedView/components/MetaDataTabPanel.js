import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { CiCalendar, CiFileOn, CiImageOn } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { PiClockClockwise } from "react-icons/pi";
import formatDate from "../../../util/formatDate";
import TextWithIcon from "../../TextWithIcon";
import CustomTabPanel from "./CustomTabPanel";

const metaDataTypes = [
  { icon: <IoKeyOutline size={20} />, type: "ID" },
  { icon: <CiFileOn size={20} />, type: "File Name" },
  { icon: <AiOutlineAppstore size={20} />, type: "Collection" },
  { icon: <CiImageOn size={20} />, type: "Media Type" },
  { icon: <CiCalendar size={20} />, type: "Publication Date" },
  { icon: <PiClockClockwise size={20} />, type: "Last Modification" },
];

function MetaDataTabPanel({ data, visibleTabIndex }) {
  return (
    <CustomTabPanel visibleTabIndex={visibleTabIndex} index={0} sx={{ w: 1 }}>
      <Box>
        <Typography variant='h6' gutterBottom>
          {data.description_str[0]}
        </Typography>
        <List disablePadding>
          {[
            data.id,
            data.filename_str[0],
            data.coll_str[0],
            data.format_str[0],
            formatDate(data.createDate_dt),
            formatDate(data.harvestDate_dt),
          ].map((data, index) => (
            <>
              <Divider />
              <ListItem
                key={data}
                sx={{
                  p: 0,
                }}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <TextWithIcon>
                        <Box sx={{ color: "text.secondary" }}>
                          {metaDataTypes[index].icon}
                        </Box>
                        <Typography
                          variant='overline'
                          sx={{ color: "text.secondary" }}
                        >
                          {metaDataTypes[index].type}
                        </Typography>
                      </TextWithIcon>
                      <Typography variant='body2'>{data}</Typography>
                    </Box>
                  }
                />
              </ListItem>
            </>
          ))}
        </List>
      </Box>
    </CustomTabPanel>
  );
}

export default MetaDataTabPanel;
