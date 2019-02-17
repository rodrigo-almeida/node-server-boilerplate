const path = require('path');
const fbAdminAuthService = require('../../shared/firebase-admin-auth.service');

module.exports = (app) => {
    // Sign up with credentials
    app.route('/auth/sign-up')
    .get((req, res) => {
        res.sendFile(path.join(__dirname + '/../../public/index.html'))
    })
    .post((req, res) => {
        /**
         * Using Firebase Admin SDK Authentication
         * You can set this in your .env file
         */
        if (process.env.FIREBASE_ADMIN_ACTIVE == 'true') {
            let user = {
                email: req.body.email,
                emailVerified: false,
                password: req.body.pass,
                displayName: 'Anonymous User',
                disabled: false
            }

            fbAdminAuthService.createUser(user)
            .then((userRecord) => {
                res.send(userRecord.toJSON());
                console.log('Successfully created new user:', userRecord.uid);
            })
            .catch((error) => {
                res.send(error.message);
                console.log('Error creating new user:', error.code);
            });
        }
    });
}