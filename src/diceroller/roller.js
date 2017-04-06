"use strict";
var Dice = require('./dice.js');
var MongoObject = require("../abstraction/mongoObject.js");

class Roller extends MongoObject {
    get collection() {
        return 'rollers';
    }

	addDie(die, sides) {
		this.activeDice[die] = new Dice(sides);
	}

	roll (die, times, comment, table) {
        if (!die || this.activeDice[die] === undefined) {
			var dice = new Dice(6);
			
			this.activeDice[die] = dice;
		}
		else {
            var dice = this.activeDice[die];
		}

        if (!table && !this.activeTable) {
			return dice.roll();
		}
		else if (!table) {
			table = this.activeTable;
		}

		var roll = dice.roll(times, comment, false, true);
		roll.table = table;
		roll.die = die;

		this.history.push(roll);

		return roll.value;
	}
}

module.exports = Roller;