const admin = require('firebase-admin');
const serviceAccount = require(`../${process.env.FIREBASE_ADMIN_CONFIG_FILE}`);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});