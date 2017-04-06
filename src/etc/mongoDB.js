var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbConfig = require('./mongoConfig.js');

class mongoDB {
    get db() {
        return global._appDb || null;
    }

    set db(value) {
        if (!global._appDb) {
            global._appDb = value;
        }
    }

    get defautlUrl() {
        return dbConfig.url;
    }

    static connect(url, callback) {
        url = url || mongoDB.defaultURL;
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

    static close(callback) {
        if (mongoDB.db !== null) {
            mongoDB.db.close();
        }

        if (typeof(callback) === 'function') {
            callback();
        }
    }
}

module.exports = mongoDB;