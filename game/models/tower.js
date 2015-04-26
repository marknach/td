function Tower(game, sprite) {
    this.sprite = game.add.sprite(sprite.x, sprite.y, sprite.key);
    this.sprite.inputEnabled = true;
    this.sprite.input.useHandCursor = true;
    // this.sprite.events.onInputOver.add(this.showRange, this);
    this.game = game;
    this.lastFired = game.time.now;
    this.range = 300;
    this.fireRate = 1000;
};

Tower.prototype = {
    fire: function() {
        var enemy = this.game.state.states['play'].enemies.getFirstAlive();
        if (enemy && this.game.time.now - this.lastFired >= this.fireRate) {
            var bullet = this.game.add.sprite(this.sprite.position.x, this.sprite.position.y, 'bullet');
            this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
            this.game.physics.arcade.moveToObject(bullet, this.whereDoIShoot(enemy), 1000);
            this.game.state.states['play'].bullets.add(bullet);
            this.lastFired = this.game.time.now;
        }
    },

    getFirstInRange: function() {
        var enemies = this.game.state.states['play'].enemies;
        return this.iterate('alive', true, Phaser.Group.RETURN_CHILD);
    },

    whereDoIShoot: function(obj) {
        //Path goes from (0, 435) to (695, 435), to (695,100)
        //Thats a total walking distance of 695 + 335 = 1030 
        //For now, let's guess ahead 30 units
        var distSoFar = obj.x + (435 - obj.y),
            newDist = distSoFar + 30;
        return {
            x: Math.min(newDist, 695),
            y: 435 - Math.max(distSoFar - 695, 0)
        }
    },

    showRange: function() {

    }
};

module.exports = Tower;