const path = require('path');
const admin = require('firebase-admin');

module.exports = (app) => {
    app.route('/auth/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '/../../public/index.html'))
    })
    .post((req, res) => {
        /**
         * Using Firebase Admin SDK Authentication
         * You can set this in your .env file
         */
        if (process.env.FIREBASE_ADMIN_ACTIVE == "true") {
            let uid = req.body.email + '#1234#' + req.body.pass; // [IMPORTANT] the UID creation must be implemented

            admin.auth().getUser(uid)
            .then((userRecord) => {
                res.send(userRecord.toJSON());
                console.log("Successfully fetched user data!");
            })
            .catch((error) => {
                res.send(error.message);
                console.log("Error fetching user data:", error);
            });
        }
    });
}