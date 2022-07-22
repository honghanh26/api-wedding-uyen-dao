const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    date: {
        type: Date,
        default: function(){
            return Date.now();
        }
    }
});

module.exports = mongoose.model(databaseConfig.col_stories, schema);