import dayjs from "dayjs";
import { useState } from "react";

function useInput() {
  const [searchType, setSearchType] = useState("freeText");
  const [searchTextValue, setSearchTextValue] = useState();
  const [searchDateValue, setSearchDateValue] = useState(dayjs("2022-04-17"));

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleTextInputChange = (event) => {
    setSearchTextValue(event.target.value);
  };

  const handleDateInputChange = (date) => {
    setSearchDateValue(date);
  };
  return {
    searchType,
    searchTextValue,
    searchDateValue,
    handleTypeChange,
    handleTextInputChange,
    handleDateInputChange,
  };
}

export default useInput;
