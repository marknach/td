
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
      this.enemies.setAll('anchor.x', 0.5);
      this.enemies.setAll('anchor.y', 0.5);

      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);

      this.initTowerBuildingPanel();
      this.player.buildTower(this.game, {x: 500, y: 300, key: 'tower'});

      this.livesText = this.game.add.text(680, 580, 'lives: 20', { font: "20px Arial", fill: "#000000", align: "left" });
      this.goldText = this.game.add.text(680, 550, 'gold: 100', { font: "20px Arial", fill: "#000000", align: "left" });
      this.timeText = this.game.add.text(400, 10, '5', { font: "36px Arial", fill: "#ffffff", align: "left" });
      this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);

    },
    update: function() {
       this.fire();
       this.game.physics.arcade.overlap(this.bullets, this.enemies, this.bulletHitsEnemy, null, this);
       this.game.physics.arcade.overlap(this.castle, this.enemies, this.enemyReachedCastle, null, this);
    },
    walkPath: function(obj) {
      this.tween = this.game.add.tween(this.unit).to({x: 695}, 6000)
                                                 .to({y: 100}, 3000)
                                                 .start();
    },
    updateTime: function() {
        var curTime = parseInt(this.timeText.text);
        if (curTime == 1) { 
            this.spawnLevel();
            curTime = 16;
        }
        this.timeText.text = curTime - 1;

    },
    spawnLevel: function() {
      this.game.time.events.repeat(Phaser.Timer.SECOND / 4, 10, this.spawnUnit, this);
    },
    spawnUnit: function() {
      this.unit = this.game.add.sprite(0, 435, 'unit');
      this.unit.hits = 2;
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
      _enemy.hits -= 1;
      _bullet.kill();
      if (_enemy.hits <= 0) {
        _enemy.kill();
        this.player.addGold(15);
        this.updateGoldText();
      }
    },
    stopDrag: function(sprite, pointer) {
      if ( this.player.gold >= 100 ) {
        this.player.buildTower(this.game, sprite);
        this.player.gold -= 100;
        this.updateGoldText();
      }
      this.towerPanel.position = {x: 203, y: 525};
      this.cannonTowerPanel.position = {x: 253, y: 525};
    },
    updateGoldText: function() {
      this.goldText.text = 'gold: ' + this.player.gold; 
    },
    initTowerBuildingPanel: function() {
      this.towerPanel = this.game.add.sprite(203, 525, 'tower');
      this.towerPanel.inputEnabled = true;
      this.towerPanel.input.useHandCursor = true;
      this.towerPanel.input.enableDrag();
      this.towerPanel.events.onDragStop.add(this.stopDrag, this);
      this.towerPanelText = this.game.add.text(200, 570, '$100', { font: "20px Arial", fill: "#000000", align: "left" });

      this.cannonTowerPanel = this.game.add.sprite(253, 525, 'cannonTower');
      this.cannonTowerPanel.inputEnabled = true;
      this.cannonTowerPanel.input.useHandCursor = true;
      this.cannonTowerPanel.input.enableDrag();
      this.cannonTowerPanel.events.onDragStop.add(this.stopDrag, this);
      this.cannonTowerPanelText = this.game.add.text(250, 570, '$150', { font: "20px Arial", fill: "#000000", align: "left" });
    }
  };
  
  module.exports = Play;
