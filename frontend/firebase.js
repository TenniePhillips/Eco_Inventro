import { initializeApp } from "@firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyCiTA_5rMnS950t_lOsGWO-HEWGh-qFcjc",
  authDomain: "ecoinventro.firebaseapp.com",
  projectId: "ecoinventro",
  storageBucket: "ecoinventro.appspot.com",
  messagingSenderId: "991025820105",
  appId: "1:991025820105:web:b4ea9f37ad1e54a221f818",
  measurementId: "G-CS2KZL3632",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
