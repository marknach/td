//place to put info about game
function Player() {
  this.towers = [];
  this.lives = 10;
}
Player.prototype = {
  getTowers: function() {
      return this.towers;
  },
  buildTower: function(game, x, y) {
      this.towers.push(new Tower(game, x, y));
  },


}
