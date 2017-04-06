// 'abstract' class built to facilitate database interaction
const mongoConfig = require('./mongoConfig.js');
const mongoDB = require('./mongoDb.js');

class MongoObject {
    constructor(id) {
        if (!Object.keys(this.schema)) {
            // placeholder for later 'schema' validation against possible documents.
        }

        this.id = id;
    }

    get schema() {
        return {
            placholder: true
        };
    }

    get collection() {
        return null;
    }

    set id(id) {
        if (!isNaN(id) && id) {
            this._id = id;
            this.loadDocument();
        }
    }

    validate(callback) {
        if (this.collection === null) {
            throw new Error("Object is improperly set up");
        }

        if (typeof (callback) === 'function') {
            callback();
        }
    }

    loadDocument() {
        this.validate(function () {
            var db = new mongoDB;
            db.connect(mongoConfig, function (db) {
                var document = this.document = db.collection(this.collection).findOne(this._id);

                for (var i in document) {
                    this[i] = document[i];
                }
            });
        });
    }

    /**
     * Probably don't ever want all to be set to true to be fair
     * @param bool     all
     * @param function callback
     */
    saveDocument(all = false, callback) {
        if (all) {
            return this._insertDocument(callback);
        }

        var savingObject = {};

        Object.keys(this.schema).forEach(function (key) {
            savingObject.key = this[key];
        });

        this.insertDocument(savingObject, callback);
    }

    insertDocument(values, callback) {
        this.validate(function () {
            db = new mongoDB;
            db.connect(mongoConfig, function (db) {
                db.collection(this.collection).insertOne(values);

                if (typeof (callback) === 'function') {
                    callback();
                }
            });
       })
    }

    _insertDocument(callback) {
        return this.insertDocument(this, callback);
    }
}

module.exports = MongoObject;