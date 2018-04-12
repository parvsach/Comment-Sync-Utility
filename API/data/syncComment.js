(function (syncComment) {

    var mongoose = require('mongoose');
    var schema = mongoose.Schema;
    var diffPatch = require('diff-match-patch');
    var dmp = new diffPatch();

    var syncCommentSchema = new mongoose.Schema({
        comment: String,
        created_on: {
            type: Date,
            default: Date.now()
        },
        modified_on: {
            type: Date,
            default: Date.now()
        }
    });

    var syncCommentModel = mongoose.model('syncComment', syncCommentSchema);

    syncComment.getComments = function (next) {
        syncCommentModel.find(function (err, comments) {
            if (err) {
                global.logger.error("Error while reading comments -" + err);
                next(err, null);
            } else {
                global.logger.debug(JSON.stringify(comments.length));
                global.logger.debug(JSON.stringify(comments));
                next(null, comments);
            }
        });

    };

    syncComment.saveComments = function (commentObject, next) {
        let data = new syncCommentModel({
            comment: commentObject.comment,
            modified_on: commentObject.modified_date
        });

        syncCommentModel.find(function (err, response) {
            if (err) {
                global.logger.error("Error while reading comments -" + err);
                next(err, null);
            } else {
                if (response.length > 0) {
                    let comment = JSON.parse(JSON.stringify(response))[0];
                    let commentDiff = dmp.diff_main(comment.comment, data.comment);
                    let diffResult = '';
                    for (let i = 0; i < commentDiff.length; i++) {
                        if (commentDiff[i][0] >= 0) {
                            diffResult = diffResult + commentDiff[i][1];
                        }
                    }
                    let query = { _id: comment._id };
                    let updatedData = {
                        $set: {
                            comment: diffResult,
                            modified_on: data.modified_on
                        }
                    };
                    syncCommentModel.findOneAndUpdate(
                        query,
                        updatedData,
                        function (err, response) {
                            if (err) {
                                global.logger.error(err);
                                next(err, null);
                            } else {
                                global.logger.debug("comment sync successfully");
                                next(null, response);
                            }
                        }
                    );
                } else {
                    data.save(function (err, comments) {
                        if (err) {
                            global.logger.error("Error while saving comments -" + err);
                            next(err, null);
                        } else {
                            global.logger.error("comment saved successfully");
                        }
                    });
                }
            }
        });
    };
    
})(module.exports);