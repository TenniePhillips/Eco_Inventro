import "../styles/globals.css";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/reset.css";
import { Analytics } from "@vercel/analytics/react";
// import { getTokens, onMessageListener } from "../firebase";

function MyApp({ Component, pageProps }) {
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: "", body: "" });
  // const [isTokenFound, setTokenFound] = useState(false);
  // getTokens(setTokenFound);

  // onMessageListener()
  //   .then((payload) => {
  //     setShow(true);
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  return (
    <ChakraProvider>
      <Analytics />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
