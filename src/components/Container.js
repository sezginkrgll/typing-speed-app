import React from "react";
// Chakra-UI
import { Box } from "@chakra-ui/react";
// Components
import Header from "./Header";
import WordsPanel from "./WordsPanel";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import ResultPanel from "./ResultPanel";
import Footer from "./Footer";

function Container() {
  return (
    <Box mt={10} w={"600px"} ml={"auto"} mr={"auto"} color={"gray.700"}>
      <Header />
      <FormSelect />
      <WordsPanel />
      <FormInput />
      <ResultPanel />
      <Footer />
    </Box>
  );
}

export default Container;
