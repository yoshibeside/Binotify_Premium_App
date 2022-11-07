import { useState } from "react";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import theme from "./styles/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Heading>Binotify Premium</Heading>
    </ChakraProvider>
  );
}

export default App;
