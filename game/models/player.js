//place to put info about game
var Tower = require('./tower.js');

function Player() {
    this.towers = [];
    this.lives = 20;
    this.gold = 100;
}
Player.prototype = {
    getTowers: function() {
        return this.towers;
    },

    buildTower: function(game, sprite) {
        this.towers.push(new Tower(game, sprite));
    },

    addGold: function(amount) {
        this.gold += amount;
        return this.gold;
    },

    loseLife: function() {
        this.lives -= 1;
    }
};

module.exports = Player;
