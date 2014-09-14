
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#FFF';
      this.sprite = this.game.add.sprite(0, 0, 'map');
    },
    update: function() {

    }
  };
  
  module.exports = Play;
