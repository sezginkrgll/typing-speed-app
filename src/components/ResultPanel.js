import React from "react";
// Chakra-UI
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
// Redux
import { useSelector } from "react-redux";

function ResultPanel() {
  const language = useSelector((state) => state.typingSpeed.language);

  const end = useSelector((state) => state.typingSpeed.end);

  const cKeystrokes = useSelector((state) => state.typingSpeed.cKeystrokes);
  const wKeystrokes = useSelector((state) => state.typingSpeed.wKeystrokes);

  const words = useSelector((state) => state.typingSpeed.words);
  const inputWords = useSelector((state) => state.typingSpeed.inputWords);

  const correctWords = inputWords.filter((item, i) => {
    if (language === "tr") {
      return item === words[i].turkish;
    } else {
      return item === words[i].english;
    }
  });

  const accuracy = (cKeystrokes / (cKeystrokes + wKeystrokes)) * 100;

  return (
    <>
      {end && (
        <Box
          mt={2}
          w={"250px"}
          borderRadius={"md"}
          bg={"white"}
          p={"10px"}
          ml={"auto"}
          mr={"auto"}
        >
          <Heading
            textAlign={"center"}
            fontSize={"xl"}
            borderBottom={"1px"}
            pb={2}
          >
            Result
          </Heading>
          <Heading
            textAlign={"center"}
            borderBottom={"1px"}
            borderColor={"black"}
            p={2}
            color={"green.500"}
          >
            {Math.round(cKeystrokes / 5)} WPM
          </Heading>
          <Flex borderBottom={"1px"} p={2}>
            <Text as={"span"} textAlign={"left"}>
              Keystrokes
            </Text>
            <Spacer as="span" />
            <Text as={"span"} textAlign={"right"}>
              (
              <Text as={"span"} color={"green.500"}>
                {cKeystrokes}
              </Text>
              {" | "}
              <Text as={"span"} color={"red.500"}>
                {wKeystrokes}
              </Text>
              ) {cKeystrokes + wKeystrokes}
            </Text>
          </Flex>
          <Flex borderBottom={"1px"} p={2}>
            <Text as={"span"} textAlign={"left"}>
              Accuracy
            </Text>
            <Spacer as="span" />
            <Text as={"span"} textAlign={"right"} fontWeight={"bold"}>
              {cKeystrokes + wKeystrokes === 0 ? 0 : accuracy.toFixed(2)}%
            </Text>
          </Flex>
          <Flex borderBottom={"1px"} p={2}>
            <Text as={"span"} textAlign={"left"}>
              Correct Words
            </Text>
            <Spacer as="span" />
            <Text
              as={"span"}
              textAlign={"right"}
              color={"green.500"}
              fontWeight={"bold"}
            >
              {correctWords.length}
            </Text>
          </Flex>
          <Flex borderBottom={"1px"} p={2}>
            <Text as={"span"} textAlign={"left"}>
              Wrong Words
            </Text>
            <Spacer as="span" />
            <Text
              as={"span"}
              textAlign={"right"}
              color={"red.500"}
              fontWeight={"bold"}
            >
              {inputWords.length - correctWords.length}
            </Text>
          </Flex>
        </Box>
      )}
    </>
  );
}

export default ResultPanel;
