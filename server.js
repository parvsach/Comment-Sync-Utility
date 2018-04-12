var http = require('http');
var express = require('express');
var app = express();

var common = require('./API/common/utils/common.js');
var path = require('path');
var bodyParser = require('body-parser');
var cookieparser = require('cookie-parser');
var session = require('express-session');
var cors = require('cors');
var nconf = require('nconf');

global.approot = path.resolve(__dirname);

InitializeExpress();

InitializeConfig();

InitializeDatabase();

InitializeLogger();

InitializeApi();

InitializeServer();

function InitializeExpress() {
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieparser());
    app.use(cors());
    app.use(express.static(__dirname + '/APP/public'));
    app.use(express.static(__dirname + '/APP/views'));
}

function InitializeConfig() {
    nconf.file('nconf', {
        file: common.configFilePath()
    });
};

function InitializeDatabase() {
    var database = require('./API/data/database.js');
    global.db = database;
};

function InitializeLogger() {
    var logger = require('./API/common/logger/loggerFactory.js');
    logger.createLogger();
    global.logger = logger;
};

function InitializeApi() {
    var apis = require('./API/api');
    apis.init(app);
};

function InitializeServer() {
    var server = http.createServer(app);
    server.listen(app.get('port'), function () {
        console.log('Server listening on port ' + app.get('port'));
    });
}
