// const FCM = require("fcm-node");
const admin = require("firebase-admin");
const serviceAccount = require("../ecoinventro-firebase-adminsdk-73d6i-70f62de93b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendFcmToken = (message) => {
  admin
    .messaging()
    .send(message)
    .then((res) => {
      console.log("message sent", res);
    })
    .catch((err) => console.log("error message", err));
};

module.exports = sendFcmToken;
