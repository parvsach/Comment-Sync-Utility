var BaseLogger = require('./baseLogger')
var winston = require('winston');
var MongoDB = require('winston-mongodb');
var utils = require('util');

function winstonLogger(loggerOptions) {
    winstonLogger
        .super_
        .call(this, loggerOptions);
    this.loggerType = 'Winston Logger';
    this.logger = new(winston.Logger)({
        transports: [
            new(winston.transports.Console)({level: loggerOptions.level}),
            new(winston.transports.File)({filename: loggerOptions.filePath, level: loggerOptions.level})
        ]
    });

    this.logger.exitOnError = false;
}

//Inherit the class - the node way
utils.inherits(winstonLogger, BaseLogger);

winstonLogger.prototype.debug = function (message) {
    // Uncomment below to call base class method
    // WinstonLogger.super_.prototype.debug.call(this, message);
    this.logger.debug(message);
}

winstonLogger.prototype.error = function (message) {
    // Uncomment below to call base class method
    // WinstonLogger.super_.prototype.debug.call(this, message);
    this.logger.error(message);
}

winstonLogger.prototype.info = function (message) {
    // Uncomment below to call base class method
    // WinstonLogger.super_.prototype.debug.call(this, message);
    this.logger.info(message);
}

module.exports = winstonLogger;
