// Loading main modules
const express = require('express');
const app = express(); // Framework module
const bodyParser = require('body-parser'); // Parser module
const morgan = require('morgan'); // Logging module

// Config modules
require('dotenv').config(); // Module that reads the .env file to load environment variables
if (process.env.FIREBASE_ADMIN_ACTIVE == "true")
    require('./config/firebase.setup'); // Firebase setup loading
if (process.env.MONGODB_ACTIVE == "true")
    require('./config/mongodb.setup'); // MongoDb setup loading

// Models
require('./components/users/user.model');

const 
    port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Middlewares
app.use(bodyParser.json()); // Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined')); // Logging configuration
app.use(express.static(`${__dirname}/public`)); // Client app

// Route handler
require('./routes/router')(app);

// Error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something broke! =(');
});

// Server listener
app.listen(port, ip, () => {
    console.log('Server running on http://%s:%s', ip, port);
});

module.exports = app;