const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    link_title: {type: String, unique:true},
    clicks: Number
});

mongoose.model('Link', linkSchema);

module.exports = mongoose.model('Link');