const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wc-database');
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('connection is ready');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});
