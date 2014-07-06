'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanUpload, app, auth, database) {
    var multipart = require('connect-multiparty');
    var multipartMiddleware = multipart();
    var fs = require('fs');
    var config = require('meanio').loadConfig();

    app.post('/meanUpload/upload', multipartMiddleware, function(req, res) {

        function rename() {
            fs.rename(req.files.file.path, config.root + req.body.dest + req.files.file.name, function(err) {
                if (err) throw err;
                else
                    res.jsonp({
                        success: true,
                        img: {
                            src: req.body.dest + req.files.file.name,
                            name: req.files.file.name
                        }
                    });
            });
        }

        var path = config.root + req.body.dest;
        if (!fs.existsSync(path)) {
            fs.mkdir(path, function() {
                rename();
            });
        } else {
            rename();
        }
    });
};