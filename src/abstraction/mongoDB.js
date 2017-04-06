var MongoClient = require('mongodb').MongoClient;

class mongoDB {
    static db = null;

    connect(url, callback) {
        if (mongoDB.db === null) {
            MongoClient.connect(url, function (err, db) {
                assert.equal(null, err);

                mongoDB.db = db;
            });
        }

        if (typeof(callback) === 'function') {
            callback(mongoDB.db);
        }
    }

    close(callback) {
        if (mongoDB.db !== null) {
            mongoDB.db.close();
        }

        if (typeof(callback) === 'function') {
            callback();
        }
    }
}

module.exports = mongoDB;