(function (syncComment) {

    var commentProvider = require('../data/syncComment');

    syncComment.init = function (app) {

        app.get('/comments', function (req, res) {
            commentProvider.getComments(function (err, comments) {
                if (err) {
                    global.logger.debug(err.description);
                } else {
                    global.logger.debug('synComment API - return all comments');
                    res.send(comments);
                    res.end();
                }
            });
        });

        app.post('/sync', function (req, res) {
            let data = {};
            data.comment = req.body.comment;
            data.modified_date = Date.now()
            commentProvider.saveComments(data, function (err, comments) {
                if (err) {
                    global.logger.debug(err.description);
                } else {
                    global.logger.debug('syncComment API - sync comment');
                    res.send(comments);
                    res.end();
                }
            });
        });
    }
})(module.exports);