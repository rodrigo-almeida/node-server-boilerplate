const 
    path = require('path');
    // each component has its own route file (when necessary)
    userApiRouter = require('../components/users/users-api.router');
    authLoginRouter = require('../components/auth/login.route');
    authSignupRouter = require('../components/auth/sing-up.route');
    oAuthRouter = require('../components/auth/oauth.route');

module.exports = (app) => {
    // GET - app root
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    });

    // Route handlers goes here
    userApiRouter(app);
    authLoginRouter(app);
    authSignupRouter(app);
    oAuthRouter(app);
}