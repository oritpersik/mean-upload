'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanUpload = new Module('mean-upload');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanUpload.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    MeanUpload.routes(app, auth, database);
    MeanUpload.aggregateAsset('js', '/packages/mean-upload/public/assets/lib/danialfarid-angular-file-upload/dist/angular-file-upload-shim.min.js', {
        absolute: true
    });
    MeanUpload.aggregateAsset('js', '/packages/mean-upload/public/assets/lib/danialfarid-angular-file-upload/dist/angular-file-upload.min.js', {
        absolute: true
    });
    MeanUpload.aggregateAsset('js', '/packages/mean-upload/public/assets/lib/danialfarid-angular-file-upload/dist/angular-file-upload.min.js', {
        absolute: true
    });
    MeanUpload.angularDependencies(['angularFileUpload']);

    return MeanUpload;
});