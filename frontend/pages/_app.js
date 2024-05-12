import "../styles/globals.css";
import React, { useEffect } from "react";
import { Box, ChakraProvider, useToast } from "@chakra-ui/react";
import "antd/dist/reset.css";
import { Analytics } from "@vercel/analytics/react";
import useFcmToken from "../tools/useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../firebase";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);
  const toast = useToast();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.sessionStorage.setItem("fcmToken", fcmToken) || null;
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        toast({
          title: payload.notification.title,
          description: payload.notification.body,
          status: "info",
          position: "top-right",
          variant: "left-accent",
          duration: 10000,
          isClosable: true,
        });
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <ChakraProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=0.6" /> */}
      </Head>
      <Analytics />
      <Box className="App">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
