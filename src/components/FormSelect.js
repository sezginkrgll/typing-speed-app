import React, { useState } from "react";
// Chakra-UI
import { Flex, Select, Text } from "@chakra-ui/react";
// Redux
import { useDispatch } from "react-redux";
import { changeLanguage } from "../redux/typingSpeedSlice";

function FormSelect() {
  const [language, setLanguage] = useState("tr");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setLanguage(value);
    dispatch(changeLanguage(value));
  };

  return (
    <Flex mt={5}>
      <Select
        w={"80px"}
        bg={"white"}
        size={"xs"}
        value={language}
        onChange={handleChange}
      >
        <option value="tr">Turkish</option>
        <option value="en">English</option>
      </Select>
      <Text ml={2}>Change test language</Text>
    </Flex>
  );
}

export default FormSelect;
