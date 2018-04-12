(function (api) {
    var syncComment = require('./syncComment');

    api.init = function (app) {
        syncComment.init(app);

        global.logger.debug('Rest Api Initialization Started..');
    }
})(module.exports);