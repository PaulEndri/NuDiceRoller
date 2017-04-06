"use strict";
class Dice {
    constructor(sides, roller, table, modifier, base) {
        this.id = id;
        this.sides = sides;
        this.modifier = modifier;
        this.base = base;
        this.rolls = [];
    }

    set sides(val) {
        if (isNaN(val) || val <= 0) {
            this._sides = 6;
        }
        else {
            this._sides = val;
        }
    }

    get sides() {
        return this._sides;
    }

    roll(times, comment, base = false, full = false) {
        var total   = 0;
        var details = [];
        times = isNaN(times) || times == 0 ? 1 : Math.ceil(times);

        for(var i = 0; i < times; i++) {
            var singleValue = self.singleRoll(base === true);
            total += singleValue;
            details.push(singleValue);
        }

        var fullDetails = {
            times   : times,
            value   : total,
            rolls   : details,
            comment : comment
        };

        this.rolls.push(fullDetails);

        if(full) {
            return fullDetails;
        }

        return total;
    }

    singleRoll(ignore) {
        var value     = Math.random();
        var rollValue = Math.ceil(value * this.sides);

        return this.evalRoll(rollValue, ignore);
    }

    evalRoll(value, ignore) {
        if (ignore === true) {
            return value;
        }

        return Math.max(value + this.modifier, this.base);
    }
}

module.exports = Dice;