const fbAdminAuthService = require('../../shared/firebase-admin-auth.service');

module.exports = (app) => {
    app.route('/api/users')
    .get((req, res) => {          
        /*admin.auth().listUsers(1000)
        .then((listUsersResult) => {
            res.send(listUsersResult.users);
        })
        .catch((error) => {
            console.log("Error listing users:", error);
        });*/
    })
    .delete((req, res) => { // Delete ALL users (this should be more secure)
         /**
         * Using Firebase Admin SDK Authentication
         * You can set this in your .env file
         */
        if (process.env.FIREBASE_ADMIN_ACTIVE == "true") {
            fbAdminAuthService.deleteAllUsers();
        }
    })
}