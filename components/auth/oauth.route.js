const passport = require('passport');

module.exports = (app) => {

    // Google OAuth
    app.route('/auth/google') // Auth confirmation
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.route('/auth/oauth/redirect') // Redirect after confirmation
    .get(passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
        res.redirect('/');
    });

    // Others goes here
}