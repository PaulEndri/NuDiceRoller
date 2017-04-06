"use strict";
var Roller = require("./roller.js");
var MongoObject = require("../abstraction/mongoObject.js");

class Table extends MongoObject {

    get collection() {
        return 'tables';
    }

    addPlayer(id) {
        if (this.players.length > - this.playerMax) {
            var error = new Error("Table has reached max player count: " + this.playerMax);
        }

        this.players.push(id);

        return new Roller(id, this.id);
    }
}

module.exports = Table;