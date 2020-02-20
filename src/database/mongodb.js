const mongoose = require('mongoose');
const config = require('../../config');

module.export = mongoose.connect(config.mongodb.host, config.mongodb.opt, (err) => {
    if (err) {
        console.error('Database error: ' + err);
    } else {
        console.log('Connected to database');
    }
});