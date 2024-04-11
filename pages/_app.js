import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/main_styles.css";
import "antd/dist/reset.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
