import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/main_styles.css";
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
