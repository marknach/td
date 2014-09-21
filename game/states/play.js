
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

      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, 'bullet');
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);

      this.player.addTower(new Tower(this.game, 500, 300));
      this.livesText = this.game.add.text(680, 550, 'lives: 20', { font: "20px Arial", fill: "#ffffff", align: "left" });

    },
    update: function() {
       this.fire();
       this.game.physics.arcade.collide(this.bullets, this.enemies, this.bulletHitsEnemy, null, this);
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
    },
    bulletHitsEnemy: function(_bullet, _enemy) {
      _bullet.kill();
      _enemy.kill();
    }
  };
  
  module.exports = Play;
