importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCiTA_5rMnS950t_lOsGWO-HEWGh-qFcjc",
  authDomain: "ecoinventro.firebaseapp.com",
  projectId: "ecoinventro",
  storageBucket: "ecoinventro.appspot.com",
  messagingSenderId: "991025820105",
  appId: "1:991025820105:web:b4ea9f37ad1e54a221f818",
  measurementId: "G-CS2KZL3632",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "./logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
