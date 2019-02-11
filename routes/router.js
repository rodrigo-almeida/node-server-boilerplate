const 
    path = require('path');
    userApiRouter = require('../components/users/users-api.router');
    authLoginRouter = require('../components/auth/login.route');
    authSignupRouter = require('../components/auth/sing-up.route');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/login.html'));
    });

    // Route handlers goes here
    userApiRouter(app);
    authLoginRouter(app);
    authSignupRouter(app);
}