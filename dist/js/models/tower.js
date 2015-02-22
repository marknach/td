function Tower(game, sprite) {
  this.sprite = game.add.sprite(sprite.x, sprite.y, sprite.key);
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
        _tower.game.physics.arcade.moveToObject(bullet, this.whereDoIShoot(enemy), 1000);
        _tower.game.state.states['play'].bullets.add(bullet);
        _tower.lastFired = _tower.game.time.now;
      }
    },
    getFirstInRange: function(_tower) {
      var enemies = _tower.game.state.states['play'].enemies;
      return this.iterate('alive', true, Phaser.Group.RETURN_CHILD);
    },
    whereDoIShoot: function(obj) {
        //Path goes from (0, 435) to (695, 435), to (695,100)
        //Thats a total walking distance of 695 + 335 = 1030 
        //For now, let's guess ahead 30 units
        var distSoFar = obj.x + (435 - obj.y)
        var newDist = distSoFar + 30;
        return {x: Math.min(newDist, 695) , y: 435 - Math.max(distSoFar - 695, 0)}
    }
};

module.exports = Tower;
