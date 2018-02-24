const mongoose = require('mongoose');
const DB_NAME = 'cambalache';
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI+DB_NAME)
    .then(() => {
        console.info(`Connect to db ${MONGODB_URI+DB_NAME}`);
    })
    .catch(error => {
        console.error(`Unable to connect to db ${DB_NAME}: ${error}`);
    });
