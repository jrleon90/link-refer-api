require('dotenv').config();
const mongoose = require('mongoose');

//MongoDB connection string
mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser: true});
mongoose.set('useCreateIndex',true);