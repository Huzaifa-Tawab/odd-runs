import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";
import "@fontsource/poppins";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
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

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontWeight: 400, // Default font weight for body text
      },
    },
  },
  textStyles: {
    light: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 300,
    },
    regular: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
    },
    medium: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    bold: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
    },
  },
  colors,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
