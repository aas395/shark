AFRAME.registerComponent("player", {
  init: function() {
    var self = this;
    this.XYmultiplier = 1.1;

    this.el.addEventListener('loaded', function() {

    });

    this.el.addEventListener('collide', function(e) {

      if(e.detail.body.el.hasAttribute('tunnel')) {
        var Game = document.querySelector('a-scene').systems['game'];
        var player = self.el;

        var playerPosition = player.getAttribute('position');
        var xPosition = playerPosition.x;
        var yPosition = playerPosition.y;
        var zPosition = playerPosition.z;

        var xDirectionAdjustment = xPosition > 0 ? -self.XYmultiplier : self.XYmultiplier;
        var yDirectionAdjustment = yPosition > 0 ? -self.XYmultiplier : self.XYmultiplier;

        if(Game.data.hasStarted) {
          // console.log('test');
          self.el.setAttribute('position', {
            x: xPosition + (5 * xDirectionAdjustment),
            y: yPosition + (5 * yDirectionAdjustment),
            z: zPosition
          });  
        }
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
  }
});
