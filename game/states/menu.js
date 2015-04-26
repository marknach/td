'use strict';

function Menu() {}

Menu.prototype = {
    preload: function() {

    },

    create: function() {
        //this.music = this.game.add.audio('music');
        //this.music.play();
        this.game.add.sprite(0, 0, "menu");
    },

    update: function() {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};

module.exports = Menu;
