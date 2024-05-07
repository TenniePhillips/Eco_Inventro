import "../styles/globals.css";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/reset.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
