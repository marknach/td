
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.lastFire = 0;
      this.game.stage.backgroundColor = '#FFF';
      this.sprite = this.game.add.sprite(0, 0, 'map');
      this.towers = this.game.add.group();
      this.towers.add( new Tower(this.game, 500, 300));
      this.spawnLevel();
    },
    update: function() {
       this.fire();
    },
    walkPath: function(obj) {
      this.tween = this.game.add.tween(this.unit).to({x: 695}, 6000)
                                                 .to({y: 100}, 3000)
                                                 .start();
    },
    spawnLevel: function(unit) {
      this.units = this.game.add.group();
      this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 10, this.spawnUnit, this);
    },
    spawnUnit: function() {
      this.unit = this.game.add.sprite(0, 435, 'unit');
      this.units.add(this.unit);
      this.walkPath(this.unit);
    },
    fire: function() {
      this.towers.forEachAlive(function(tower){
        Tower.prototype.fire(tower);
      });
    }
  };
  
  module.exports = Play;
