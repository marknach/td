function Tower(game, x, y) {
  this.sprite = game.add.sprite(x, y, 'tower');
}
Tower.prototype = {
    fire: function(game, _tower) {
      console.log("pew  pew");
    }
}
