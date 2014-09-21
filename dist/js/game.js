(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'tdies');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.player = new Player();
      this.game.stage.backgroundColor = '#FFF';
      this.sprite = this.game.add.sprite(0, 0, 'map');
      this.castle = this.game.add.sprite(660, 60, 'castle');
      this.castle.physicsBodyType  = Phaser.Physics.ARCADE; 
      this.game.physics.enable(this.castle, Phaser.Physics.ARCADE);

      this.enemies = this.game.add.group();
      this.enemies.enableBody = true;
      this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
      this.spawnLevel();
      this.enemies.setAll('anchor.x', 0.5);
      this.enemies.setAll('anchor.y', 0.5);

      this.player.addTower(new Tower(this.game, 500, 300));
      this.livesText = this.game.add.text(680, 550, 'lives: 20', { font: "20px Arial", fill: "#ffffff", align: "left" });

    },
    update: function() {
       this.fire();
       this.game.physics.arcade.overlap(this.castle, this.enemies, this.enemyReachedCastle, null, this);
    },
    walkPath: function(obj) {
      this.tween = this.game.add.tween(this.unit).to({x: 695}, 6000)
                                                 .to({y: 100}, 3000)
                                                 .start();
    },
    spawnLevel: function(unit) {
      this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 10, this.spawnUnit, this);
    },
    spawnUnit: function() {
      this.unit = this.game.add.sprite(0, 435, 'unit');
      this.enemies.add(this.unit);
      this.walkPath(this.unit);
    },
    fire: function() {
      this.player.getTowers().forEach(function(tower){
        Tower.prototype.fire(tower);
      });
    },
    enemyReachedCastle: function(_castle, _enemy) {
      this.player.lives -= 1;
      this.livesText.text = 'lives: ' + this.player.lives;
      _enemy.kill();
      if ( this.player.lives === 0 )
          this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;

},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('map', 'assets/map.png');
    this.load.image('castle', 'assets/castle.png');
    this.load.image('unit', 'assets/unit1.png');
    this.load.image('tower', 'assets/tower1.png');
    this.load.image('bullet', 'assets/bullet.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])