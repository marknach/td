//place to put info about game
function Player() {
  this.towers = [];
  this.lives = 10;
}
Player.prototype = {
  getTowers: function() {
      return this.towers;
  },
  addTower: function(tower) {
      this.towers.push(tower);
  },


}
