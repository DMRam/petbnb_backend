const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseConfig"); // Path to your Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "gs://petbnb-e4caa.appspot.com",
});

const db = admin.database();

module.exports = { db };
