const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String, unique: true},
    password: String
});

mongoose.model('User', userSchema);

module.exports = mongoose.model('User');