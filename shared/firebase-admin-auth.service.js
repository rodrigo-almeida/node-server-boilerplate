const admin = require('firebase-admin');

function createUser(user) {
    return admin.auth().createUser({
        uid: user.uid || user.email + '#1234#' + user.password, // [IMPORTANT TO BE REPLACED] the UID creation must go here, 
        email: user.email,
        emailVerified: false,
        password: user.password,
        displayName: user.displayName,
        disabled: false
    });
}

function deleteAllUsers() {
    admin.auth().listUsers(1000)
    .then((res) => {
        res.users.forEach((user) => {
            let email = user.email;
            admin.auth().deleteUser(user.uid);
            console.log(`${email} was deleted!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
    return;
}

function getUserByUID(uid) {
    return admin.auth().getUser(uid);
}

module.exports = {
    createUser,
    getUserByUID,
    deleteAllUsers
}