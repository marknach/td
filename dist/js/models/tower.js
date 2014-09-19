function Tower(game, x, y) {
  return game.add.sprite(x, y, 'tower');
}
Tower.prototype = {
    fire: function() {
      console.log("pew  pew");
    }
}
