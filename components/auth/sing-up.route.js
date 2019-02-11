const path = require('path');
var admin = require('firebase-admin');

module.exports = (app) => {
    app.route('/auth/sign-up')
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

                admin.auth().createUser({
                    uid: uid, 
                    email: req.body.email,
                    emailVerified: false,
                    password: req.body.pass,
                    displayName: "Anonymous User",
                    disabled: false
                })
                .then((userRecord) => {
                    res.send(userRecord.toJSON());
                    console.log("Successfully created new user:", userRecord.uid);
                })
                .catch((error) => {
                    res.send(error);
                    console.log("Error creating new user:", error);
                });
            }
        });
}