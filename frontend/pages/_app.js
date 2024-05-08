import "../styles/globals.css";
import React, { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/reset.css";
// import firebase from "../firebase";
// import { message } from "antd";

function MyApp({ Component, pageProps }) {
  // const initMessage = () => {
  //   const messaging = firebase.messaging();
  //   messaging
  //     .requestPermission()
  //     .then(() => {
  //       return messaging.getToken();
  //     })
  //     .then((token) => console.log("token", token))
  //     .catch((e) => console.log("error", e));
  // };

  // useEffect(() => {
  //   initMessage();
  // }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
