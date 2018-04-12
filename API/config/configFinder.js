(function (configFinder) {
    var fs = require('fs');
    var path = require('path');

    configFinder.find = function (env) {

        var configpath = path.join(global.approot, 'API/config/config' + env + '.json');
        var exists = fs.existsSync(configpath);

        if (exists) 
            return configpath;
        else 
            return path.join(global.approot, 'API/config/config.json');

        };
        
})(module.exports);