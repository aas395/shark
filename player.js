AFRAME.registerComponent("player", {
  init: function() {},
  tick : function() {
      var Game = document.querySelector('a-scene').systems['game'];

      if(Game.data.hasStarted) {
        var targetPosition = this.el.getAttribute('position');
        const direction = this.el.components.camera.camera.getWorldDirection();
        var forwardMotionCoefficient = Game.data.forwardMotionCoefficient;

        Game.setDistance(targetPosition.z);

        var currentPosition = {
          x: targetPosition.x + direction.x,
          y: targetPosition.y + direction.y,
          z: targetPosition.z + -forwardMotionCoefficient
        };

        this.el.setAttribute('position', currentPosition);
      }
  }
});
