var Dice = require('./dice.js');
var Roller = require('./roller.js');
var Table = require('./table.js');

class DiceRoller {
    constructor() {
        this.tables = [];
        this.players = [];
    }

    createTable(name, maxPlayers){
        var table = new Table;

        table.maxPlayers = maxPlayers;
        table.name = name;

        this.tables.push = table;
        return table;
    }

    createPlayer(id){
        var player = new Roller(id);

        this.players.push(player);

        return player;
    }

    quickRoll(sides, times, seperate = false) {
        var dice = new Dice(sides);

        if (seperate) {
            var rolls = []
            for (var i = 0; i < times; i++) {
                rolls.push(dice.roll());
            }

            return rolls;
        }

        return dice.roll(times);
    }
}

module.exports = DiceRoller;