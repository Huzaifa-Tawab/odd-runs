// TextStyle1.js
import React from "react";
import { ChakraProvider, extendTheme, Text } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "#000",
        fontFamily: "Poppins",
        fontSize: "20px",
        fontWeight: 600,
      },
    },
  },
});

const TextStyle1 = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <Text>{children}</Text>
    </ChakraProvider>
  );
};

export default TextStyle1;
