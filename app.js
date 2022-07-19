var createError = require('http-errors');
var express = require('express');
var cors = require('cors');

const mongoose = require('mongoose');

var app = express();
app.use(express.json());
app.use(cors());
require('dotenv/config');

const pathConfig = require('./path');
global.__base = __dirname + '/';
global.__path_app = __base + pathConfig.folder_app + '/';

global.__path_schemas = __path_app + pathConfig.folder_schemas + '/';
global.__path_models = __path_app + pathConfig.folder_models + '/';
global.__path_controllers = __path_app + pathConfig.folder_controllers + '/';
global.__path_routers = __path_app + pathConfig.folder_routers + '/';
global.__path_configs = __path_app + pathConfig.folder_configs + '/';
global.__path_uploads = __path_app + pathConfig.folder_uploads + '/';

const systemConfig = require(__path_configs + 'system');
const databaseConfig = require(__path_configs + 'database');

//Local variable
app.locals.systemConfig = systemConfig;
mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.n8phe.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    })

// Setup router
app.use('/api/v1', require(__path_routers));

// Catch 404 and forward to error hander
app.use(function(req, res, next) {
    next(createError(404));
})

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    //render the error page
    res.status(err.status || 500);
    res.end('Error App');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Node JS server listening on port " + port);
})

module.exports = app;