const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    img: Array
});

module.exports = mongoose.model(databaseConfig.col_galleries, schema);