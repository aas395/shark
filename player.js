AFRAME.registerComponent("player", {
  init: function() {
    var self = this;
    this.XYmultiplier = 2;
    this.playerCanMove = false;

    self.el.sceneEl.addEventListener('gamereset', function() {
        var playerPosition = self.el.getAttribute('position');
        self.el.setAttribute('position', {x:0,  y:0, z: playerPosition.z});
    });

    self.el.sceneEl.addEventListener('gamestart', function() {
        self.playerCanMove = true;
    });

    self.el.sceneEl.addEventListener('gameend', function() {
        self.playerCanMove = false;
    });

    self.el.addEventListener('collide', function(e) {
      if(e.detail.body.el.hasAttribute('tunnel')) {
        self.handleWallCollision();
      }
    });
  },
  tick : function() {
      if(this.playerCanMove) {
        var playerPosition = this.el.getAttribute('position');
        var direction = this.el.components.camera.camera.getWorldDirection();

        var currentPosition = {
          x: playerPosition.x + (direction.x * this.XYmultiplier),
          y: playerPosition.y + (direction.y * this.XYmultiplier),
          z: playerPosition.z
        };

        this.el.setAttribute('position', currentPosition);
      }
  },
  handleWallCollision: function() {
    var Game = document.querySelector('a-scene').systems['game'];

    if(Game.data.hasStarted) {
      // console.log('collision');
      var self = this;
      var player = this.el;
      var playerPosition = player.getAttribute('position');
      var xPosition = playerPosition.x;
      var yPosition = playerPosition.y;
      var zPosition = playerPosition.z;

      var direction = this.el.components.camera.camera.getWorldDirection();

      var xDirectionAdjustmentSign = xPosition * direction.x > 0 ? -1 : 1;
      var yDirectionAdjustmentSign = yPosition * direction.y > 0 ? -1 : 1;

      var xDirectionAdjustment = self.XYmultiplier * xDirectionAdjustmentSign * direction.x * 20;
      var yDirectionAdjustment = self.XYmultiplier * yDirectionAdjustmentSign * direction.y * 20;
    
      this.playerCanMove = false;

      self.el.setAttribute('position', {
        x: xPosition + xDirectionAdjustment,
        y: yPosition + yDirectionAdjustment,
        z: zPosition
      });

      setTimeout(function() {
        self.playerCanMove = true;
      }, 250);
    }
  }
});
