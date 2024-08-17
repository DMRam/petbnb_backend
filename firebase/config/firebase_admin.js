const admin = require('firebase-admin');
const serviceAccount = require('../../petbnb-e4caa-firebase-adminsdk-um9gv-afdba7b9d6.json'); // Path to your service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://petbnb-e4caa-default-rtdb.firebaseio.com/",
  storageBucket: "petbnb-e4caa.appspot.com",
});

const db = admin.database();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
