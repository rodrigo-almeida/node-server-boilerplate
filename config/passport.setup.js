const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const fbAdminAuthService = require('../shared/firebase-admin-auth.service');

passport.initialize();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new googleStrategy({
        callbackURL: '/auth/oauth/redirect',
        clientID: process.env.PASS_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASS_GOOGLE_CLIENT_SECRET
    }, (accessToken, refreshToken, profile, done) => { // passport callback
        fbAdminAuthService.getUserByUID(profile.id)
        .then((userRecord) => {
            console.log('User found! UID: ' + userRecord.uid);
            done(null, profile);
        })
        .catch((error) => {
            let user = {
                email: profile.emails[0].value,
                emailVerified: false,
                password: '123456', //this must be changed
                displayName: profile.displayName,
                disabled: false
            };

            //adds the user in firebase
            fbAdminAuthService.createUser(user)
            .then((createdUser) => {
                console.log('Successfully created new user:', createdUser.uid);
                return done(null, {uid: createdUser.uid, email: createdUser.email, pass: createdUser.passwordHash});
            })
            .catch((error) => {
                console.log('Error creating new user:', error.code);
                return done(error, null);
            });
        });
    })
);