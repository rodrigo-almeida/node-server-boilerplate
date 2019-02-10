const path = require('path');

module.exports = function(app) {
    app.route('/auth/sign-up')
        .get((req, res) => {
            res.sendFile(path.join(__dirname + '/../../public/index.html'))
        })
        .post((req, res) => {
            res.send('SIGN UP POST!');
        });
}