const mongoose = require('mongoose');
const DB_NAME = 'cambalache';
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.info(`Connect to db ${DB_NAME}`);
    })
    .catch(error => {
        console.error(`Unable to connect to db ${DB_NAME}: ${error}`);
    });
