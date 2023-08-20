import React, { useEffect, useState } from "react";
// Chakra-UI
import { Flex, Input, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
// Components
import Countdown from "./Countdown";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { retry, addItem, changeInput } from "../redux/typingSpeedSlice";

function FormInput() {
  const start = useSelector((state) => state.typingSpeed.start);
  const end = useSelector((state) => state.typingSpeed.end);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!start) {
      setText("");
    }
  }, [start]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!end) {
      const value = e.target.value;
      setText(value);

      if (value[value.length - 1] === " ") {
        if (value.length > 1) {
          dispatch(addItem(value.trim()));
        }
        setText("");
      } else {
        dispatch(changeInput(value.trim()));
      }
    }
  };

  return (
    <Flex mt={5}>
      <Input bg={"white"} value={text} onChange={handleChange} />
      <Countdown />
      <Button ml={2} colorScheme="teal" onClick={() => dispatch(retry())}>
        <RepeatIcon />
      </Button>
    </Flex>
  );
}

export default FormInput;
