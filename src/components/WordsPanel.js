import React, { useEffect } from "react";
// Chakra-UI
import { Box, Wrap } from "@chakra-ui/react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { overFlow } from "../redux/typingSpeedSlice";

function WordsPanel() {
  const words = useSelector((state) => state.typingSpeed.words);
  const inputWords = useSelector((state) => state.typingSpeed.inputWords);
  const language = useSelector((state) => state.typingSpeed.language);
  const inputCheck = useSelector((state) => state.typingSpeed.inputCheck);
  const end = useSelector((state) => state.typingSpeed.end);
  const mtop = useSelector((state) => state.typingSpeed.mtop);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(overFlow());
  }, [dispatch, inputWords]);

  const boxBg = (arrLength, i) => {
    if (!inputCheck) {
      if (arrLength === i) {
        return "red.500";
      }
    }
    if (arrLength >= i + 1) {
      return "none";
    }
    return "gray.200";
  };

  const textColor = (arrLength, i, item) => {
    if (arrLength >= i + 1) {
      if (language === "tr") {
        if (inputWords[i] === item.turkish) {
          return "green.400";
        } else {
          return "red";
        }
      } else {
        if (inputWords[i] === item.english) {
          return "green.400";
        } else {
          return "red.500";
        }
      }
    } else {
      return "gray.700";
    }
  };

  return (
    <Box
      mt={2}
      h={"90px"}
      borderRadius={"md"}
      bg={"white"}
      overflow={"hidden"}
      pt={"10px"}
      pl={"10px"}
      pr={"10px"}
      pb={"20px"}
    >
      {!end && (
        <Wrap spacing="10px" mt={`${mtop}px`} fontFamily={"mono"}>
          {words.map((item, i) => (
            <Box
              as="span"
              bg={boxBg(inputWords.length, i)}
              color={textColor(inputWords.length, i, item)}
              key={item.rank}
              p={"3px"}
              borderRadius={"sm"}
              borderBottom={inputWords.length === i ? "2px" : ""}
            >
              {language === "tr" ? item.turkish : item.english}
            </Box>
          ))}
        </Wrap>
      )}
    </Box>
  );
}

export default WordsPanel;
