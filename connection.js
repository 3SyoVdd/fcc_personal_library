const mongoose = require('mongoose');

require('dotenv').config();


const URI = process.env.MONGO_URI;

const db = mongoose.connect(URI);

module.exports = db;
