function Tower(game, x, y) {
  this.sprite = game.add.sprite(x, y, 'tower');
  this.game = game;
  this.lastFired = game.time.now;
  this.fireRate = 1000;
}
Tower.prototype = {
    fire: function(_tower) {
      enemy = _tower.game.state.states['play'].enemies.getFirstAlive();
      if ( enemy && _tower.game.time.now - _tower.lastFired  >= _tower.fireRate ) {
        console.log('pew pew');
        enemy.kill();
        _tower.lastFired = _tower.game.time.now;
      }
    },

}
