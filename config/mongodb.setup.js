// Loading modules
const mongoose = require('mongoose');

// Setting up mongoose
mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL;
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }); // useNewUrlParser is needed to deal with deprecated connection's url 


// mongoose status CONNECTED
mongoose.connection.on('connected', () => {  
    console.log('Mongoose default connection is open to ', process.env.MONGO_URL);
});

// mongoose status ERROR
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection has occured with error: %s', err);
});

// mongoose status DISCONNECTED
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is closed!');
});

// mongoose SIGNALS
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection is disconnected due to application termination!');
        process.exit();
    });
});