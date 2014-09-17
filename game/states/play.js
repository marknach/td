
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#FFF';
      this.sprite = this.game.add.sprite(0, 0, 'map');
      this.unit = this.game.add.sprite(0, 435, 'unit');
      this.tween = this.game.add.tween(this.unit).to({x: 695}, 1000)
                                                 .to({y: 100}, 1000)
                                                 .start();
    },
    update: function() {

    }
  };
  
  module.exports = Play;
