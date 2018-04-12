(function (loggerFactory) {
    var nconf = require('nconf');
    var path = require('path');
    var logger = null;
    
    loggerFactory.createLogger = function () {
        var options = nconf.get('logger');
        
        options.filePath = path.join(global.approot, options.filePath);
        
        var loggerType = options.type;
        switch (loggerType) {
            case "winston":
                var winstonLogger = require('./winstonLogger.js');
                logger = new winstonLogger(options);
                break;
            default:
                var baseLogger = require('./baseLogger.js');
                logger = new baseLogger(options);
                break;
        }
    };
    
    loggerFactory.debug = function (message) {
        logger.debug(message);
    };
    
    loggerFactory.error = function (error) {
        logger.error(error);
    }
    
    loggerFactory.info = function (info) {
        logger.info(info);
    }

})(module.exports);