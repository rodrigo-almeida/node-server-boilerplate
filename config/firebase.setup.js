var admin = require("firebase-admin");

var serviceAccount = require(`../${process.env.FIREBASE_CONFIG}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-base.firebaseio.com"
});