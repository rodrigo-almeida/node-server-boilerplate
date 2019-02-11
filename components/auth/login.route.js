const path = require('path');
const admin = require('firebase-admin');

module.exports = function(app) {
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
                let uid = req.body.email + '1234'; // [IMPORTANT] the UID creation must be implemented

                admin.auth().getUser(uid)
                .then(function(userRecord) {
                    res.send(userRecord.toJSON());
                    console.log("Successfully fetched user data!");
                })
                .catch(function(error) {
                    res.send(error);
                    console.log("Error fetching user data:", error);
                });
            }
        });
}