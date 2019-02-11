const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
//const secret = require('../config').secret;
const secret = '1234'; // remove this after create the above config file

let UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    bio: String,
    hash: {type: String, required: true},
    salt: {type: String, required: true}
}, {timestamps: true});

// Unique validation
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// Hash password with crypto using the generated salt 
UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// Validates the user's password
UserSchema.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// Generates the web token
UserSchema.methods.generateJWT = () => {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

// Returns the user as JSON for authentication
UserSchema.methods.toAuthJSON = () => {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
};

mongoose.model('User', UserSchema);