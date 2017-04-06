"use strict";
var Roller = require("./roller.js");
var MongoObject = require("../etc/mongoObject.js");

class Table extends MongoObject {
    get schema() {
        return {
            name: string,
            players: [],
            playerMax: int
        };
    }
    get collection() {
        return 'tables';
    }

    addPlayer(id) {
        if (this.players.length > - this.playerMax) {
            var error = new Error("Table has reached max player count: " + this.playerMax);
        }

        this.players.push(id);

        return new Roller(id, this._id);
    }
}

module.exports = Table;