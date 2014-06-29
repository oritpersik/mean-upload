'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanUpload, app, auth, database) {
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
    var fs = require('fs');
    var config = require('../../../../config/env/all');

    app.post('/meanUpload/upload', multipartMiddleware, function(req, res) {
        fs.rename(req.files.file.path, config.root + req.body.dest + req.files.file.name, function(err) {
            if (err) throw err;
            else
                res.jsonp({
                    success: true,
                    img: req.body.dest + req.files.file.name
                });
        });
    });
};