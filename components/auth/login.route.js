const path = require('path');
const fbAdminAuthService = require('../../shared/firebase-admin-auth.service');

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
            // [IMPORTANT TO BE REPLACED] the UID creation must go here
            let uid = req.body.email + '#1234#' + req.body.pass; 

            // [IMPORTANT TO BE REPLACED] Put the firebase-admin-auth-service's method here
            fbAdminAuthService.getUserByUID(uid)
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