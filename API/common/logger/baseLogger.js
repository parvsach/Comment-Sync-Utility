function baseLogger(loggerOptions) {
    this.options = loggerOptions;
    this.loggertype = 'Base Logger';
};

baseLogger.prototype.options = function () {
    return this.options;
};

baseLogger.prototype.info = function (message) {
    console.log('Info' + message);
};

baseLogger.prototype.error = function (message) {
    console.log('Error' + message);
};

baseLogger.prototype.debug = function (message) {
    console.log('Debug' + message);
};

module.exports = baseLogger;