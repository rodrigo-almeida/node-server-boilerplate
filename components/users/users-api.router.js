const admin = require('firebase-admin');

module.exports = (app) => {
    app.route('/api/users')
    .get((req, res) => {          
        admin.auth().listUsers(1000)
        .then((listUsersResult) => {
            res.send(listUsersResult.users);
        })
        .catch((error) => {
            console.log("Error listing users:", error);
        });
    });
}