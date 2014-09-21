//place to put info about game
function Player() {
  this.towers = [];
  this.lives = 20;
}
Player.prototype = {
  getTowers: function() {
      return this.towers;
  },
  addTower: function(tower) {
      this.towers.push(tower);
  },


}
