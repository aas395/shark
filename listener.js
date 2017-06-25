AFRAME.registerComponent("listener", {
  schema : 
  {
    target: {
      type: 'selector'
    }
  },
  init: function() {
    var playerEl = document.querySelector('#character');
    var that = this;

    playerEl.addEventListener('collide', function (e) {
      var collidedWithEl = e.detail.body.el;
      console.log('collision');

      if(collidedWithEl.hasAttribute('tunnel')) {
        console.log('Collided with the wall');

        var xPosition = e.detail.target.position.x;
        var yPosition = e.detail.target.position.y;

        var xDirectionAdjustment = xPosition > 0 ? -1 : 1; 
        var yDirectionAdjustment = yPosition > 0 ? -1 : 1;

        document.querySelector('#character').setAttribute('position', {
            x: xPosition + (5 * xDirectionAdjustment),
            y: yPosition + (5 * yDirectionAdjustment)
        });
      }
    });
  },
  tick : function() {
      var Game = document.querySelector('a-scene').systems['game'];
      const targetItem = this.data.target;            
      var targetPosition = targetItem.getAttribute('position');
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
});