(function () {

    var nconf = require('nconf');
    var mongoose = require('mongoose');

    var dbconfig = nconf.get('database');

    var dbURI = 'mongodb://'  + dbconfig.host + ":" + dbconfig.port + '/' + dbconfig.dbName;
    // set globally connection string
    console.log('Mongo shall be connected at :' + dbURI);

    mongoose.connect(dbURI);

    mongoose.connection.once('connected', function () {
       console.log('Mongoose default connection open to ' + dbURI);
        if (dbconfig.seedData ===  true) {
            mongoose.connection.db.dropDatabase(function () {
                console.log('database dropped');
            });
        }
    });
    
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
})(module.exports);