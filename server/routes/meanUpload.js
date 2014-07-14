'use strict';

// The Package is past automatically as first parameter
module.exports = function(MeanUpload, app, auth, database) {
    var multipart = require('connect-multiparty'),
        multipartMiddleware = multipart(),
        fs = require('fs'),
        config = require('meanio').loadConfig(),
        mkdirOrig = fs.mkdir,
        osSep = '/';

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
            mkdir_p(path, function(err) {
                rename();
            });
        } else {
            rename();
        }
    });

    function mkdir_p(path, callback, position) {
        var parts = require('path').normalize(path).split(osSep);

        position = position || 0;

        if (position >= parts.length) {
            return callback();
        }

        var directory = parts.slice(0, position + 1).join(osSep) || osSep;
        fs.stat(directory, function(err) {
            if (err === null) {
                mkdir_p(path, callback, position + 1);
            } else {
                mkdirOrig(directory, function(err) {
                    if (err && err.code != 'EEXIST') {
                        return callback(err);
                    } else {
                        mkdir_p(path, callback, position + 1);
                    }
                });
            }
        });
    }
};