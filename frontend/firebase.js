// import { initializeApp } from "@firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// var firebaseConfig = {
//   apiKey: "AIzaSyCiTA_5rMnS950t_lOsGWO-HEWGh-qFcjc",
//   authDomain: "ecoinventro.firebaseapp.com",
//   projectId: "ecoinventro",
//   storageBucket: "ecoinventro.appspot.com",
//   messagingSenderId: "991025820105",
//   appId: "1:991025820105:web:b4ea9f37ad1e54a221f818",
//   measurementId: "G-CS2KZL3632",
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebaseApp);

// export const getTokens = (setTokenFound) => {
//   return getToken(messaging, { vapidKey: "GENERATED_MESSAGING_KEY" })
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log("current token for client: ", currentToken);
//         setTokenFound(true);
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//       } else {
//         console.log(
//           "No registration token available. Request permission to generate one."
//         );
//         setTokenFound(false);
//         // shows on the UI that permission is required
//       }
//     })
//     .catch((err) => {
//       console.log("An error occurred while retrieving token. ", err);
//       // catch error while creating client token
//     });
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload);
//     });
//   });
