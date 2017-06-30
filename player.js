AFRAME.registerComponent("player", {
  init: function() {
    var self = this;
    this.XYmultiplier = 2.5;

    self.el.sceneEl.addEventListener('gamereset', function() {
        var playerPosition = self.el.getAttribute('position');
        self.el.setAttribute('position', {x:0,  y:0, z: playerPosition.z});
    });

    self.el.addEventListener('collide', function(e) {
      if(e.detail.body.el.hasAttribute('tunnel')) {
        self.handleWallCollision();
      }
    });
  },
  tick : function() {
      var Game = document.querySelector('a-scene').systems['game'];

      if(Game.data.hasStarted) {
        var playerPosition = this.el.getAttribute('position');
        const direction = this.el.components.camera.camera.getWorldDirection();

        var currentPosition = {
          x: playerPosition.x + (direction.x * this.XYmultiplier),
          y: playerPosition.y + (direction.y * this.XYmultiplier),
          z: playerPosition.z
        };

        this.el.setAttribute('position', currentPosition);
      }
  },
  handleWallCollision: function() {
    var self = this;
    var Game = document.querySelector('a-scene').systems['game'];
    var player = this.el;

    var playerPosition = player.getAttribute('position');
    var xPosition = playerPosition.x;
    var yPosition = playerPosition.y;
    var zPosition = playerPosition.z;

    var xDirectionAdjustment = xPosition > 0 ? -self.XYmultiplier : self.XYmultiplier;
    var yDirectionAdjustment = yPosition > 0 ? -self.XYmultiplier : self.XYmultiplier;

    if(Game.data.hasStarted) {
      self.el.setAttribute('position', {
        x: xPosition + (5 * xDirectionAdjustment),
        y: yPosition + (5 * yDirectionAdjustment),
        z: zPosition
      });  
    }
  }
});
