const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
const serviceAccount = require('../../petbnb-e4caa-firebase-adminsdk-um9gv-afdba7b9d6.json'); // Path to your service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petbnb-e4caa-default-rtdb.firebaseio.com/",
  storageBucket: "petbnb-e4caa.appspot.com",
});

// Initialize Google Cloud Storage client
const storage = new Storage({
  credentials: serviceAccount,
});

const db = admin.database(); // For Realtime Database

module.exports = { db, storage };