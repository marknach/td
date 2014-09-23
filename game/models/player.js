//place to put info about game
function Player() {
  this.towers = [];
  this.lives = 20;
  this.gold = 100;
}
Player.prototype = {
  getTowers: function() {
      return this.towers;
  },
  buildTower: function(game, x, y) {
      this.towers.push(new Tower(game, x, y));
  },
  addGold: function(amount) {
    this.gold += amount;
    return this.gold;
  },


}
