const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        typeof: String,
        required: true
    },
    password: {
        typeof: String,
        required: true
    },
    firstname: {
        typeof: String,
        required: true
    },
    lastname: {
        typeof: String,
        required: true
    },
});

const User = mongoose.model('user', userSchema);

module.exports({ User })