function Tower(game, x, y) {
  this.sprite = game.add.sprite(x, y, 'tower');
  this.game = game;
  this.lastFired = game.time.now;
  this.range = 300;
  this.fireRate = 1000;
}
Tower.prototype = {
    fire: function(_tower) {
      var enemy = _tower.game.state.states['play'].enemies.getFirstAlive();
      if ( enemy && _tower.game.time.now - _tower.lastFired  >= _tower.fireRate ) {
        var bullet = _tower.game.add.sprite(_tower.sprite.position.x, _tower.sprite.position.y, 'bullet');
        _tower.game.physics.enable(bullet, Phaser.Physics.ARCADE);
        _tower.game.physics.arcade.moveToObject(bullet, enemy, 600);
        _tower.game.state.states['play'].bullets.add(bullet);
        _tower.lastFired = _tower.game.time.now;
      }
    },
    getFirstInRange: function(_tower) {
      var enemies = _tower.game.state.states['play'].enemies;
      return this.iterate('alive', true, Phaser.Group.RETURN_CHILD);
    }

}
