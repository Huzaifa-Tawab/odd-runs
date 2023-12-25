import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/poppins";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/500.css";
const colors = {
  styles: {
    global: {
      body: {
        color: "#121432",
        fontFamily: "Poppins",
      },
    },
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
    mono: "Menlo, monospace",
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
