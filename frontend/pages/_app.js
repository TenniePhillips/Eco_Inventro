import "../styles/globals.css";
import React, { useEffect } from "react";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import "antd/dist/reset.css";
import { Analytics } from "@vercel/analytics/react";
import useFcmToken from "../tools/useFcmToken";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../firebase";
// import { getTokens, onMessageListener } from "../firebase";

function MyApp({ Component, pageProps }) {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);
  const toast = useToast();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        toast({
          title: payload.notification.title,
          description: payload.notification.body,
          status: "info",
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
      <Analytics />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
