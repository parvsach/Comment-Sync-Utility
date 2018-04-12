(function (common) {

    var path = require('path');
    var env = process.env.NODE_ENV || 'development';
    
    common.configFilePath = function () {
        var configFolderPath = path.join(global.approot, 'API/config');
        var configFinderPath = path.join(configFolderPath, 'configFinder');

        var configFinder = require(configFinderPath);
        return configFinder.find(env, configFolderPath);
    };

    common.noCache = function (res) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }

})(module.exports);