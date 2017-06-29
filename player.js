AFRAME.registerComponent("player", {
  init: function() {},
  tick : function() {
      var Game = document.querySelector('a-scene').systems['game'];

      if(Game.data.hasStarted) {
        var playerPosition = this.el.getAttribute('position');
        const direction = this.el.components.camera.camera.getWorldDirection();

        var currentPosition = {
          x: playerPosition.x + direction.x,
          y: playerPosition.y + direction.y,
          z: playerPosition.z
        };

        this.el.setAttribute('position', currentPosition);
      }
  }
});
