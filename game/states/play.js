
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#FFF';
      this.sprite = this.game.add.sprite(0, 0, 'map');
      this.spawnLevel();
    },
    update: function() {

    },
    walkPath: function(obj) {
      this.tween = this.game.add.tween(this.unit).to({x: 695}, 5000)
                                                 .to({y: 100}, 5000)
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
    }
  };
  
  module.exports = Play;
