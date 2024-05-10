// // import { initializeApp } from "firebase/app";
// // import { getMessaging, getToken, onMessage } from "firebase/messaging/sw";
// // Scripts for firebase and firebase messaging
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker by passing the generated config
// var firebaseConfig = {
//   apiKey: "AIzaSyCiTA_5rMnS950t_lOsGWO-HEWGh-qFcjc",
//   authDomain: "ecoinventro.firebaseapp.com",
//   projectId: "ecoinventro",
//   storageBucket: "ecoinventro.appspot.com",
//   messagingSenderId: "991025820105",
//   appId: "1:991025820105:web:b4ea9f37ad1e54a221f818",
//   measurementId: "G-CS2KZL3632",
// };

// firebase.initializeApp(firebaseConfig);
// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
