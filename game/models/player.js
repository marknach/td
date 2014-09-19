//place to put info about game
function Player() {
  this.towers = [];
}
Player.prototype = {
  getTowers: function() {
      return this.towers;
  },
  addTower: function(tower) {
      this.towers.push(tower);
  },


}
