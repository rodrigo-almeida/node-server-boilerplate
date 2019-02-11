const admin = require('firebase-admin');

module.exports = function(app) {
    app.route('/api/users')
        .get((req, res) => {          
            admin.auth().listUsers(1000)
            .then(function(listUsersResult) {
                res.send(listUsersResult.users);
            })
            .catch(function(error) {
                console.log("Error listing users:", error);
            });
        });
}