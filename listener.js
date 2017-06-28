AFRAME.registerComponent("listener", {
  schema :
  {
    target: {
      type: 'selector'
    }
  },
  init: function() {
    var Game = document.querySelector('a-scene').systems['game'];
    var playerEl = document.querySelector('#character');
    var that = this;

    playerEl.addEventListener('collide', function (e) {
      var collidedWithEl = e.detail.body.el;

      if(collidedWithEl.hasAttribute('tunnel')) {
        console.log('Collided with the wall');

        var xPosition = e.detail.target.position.x;
        var yPosition = e.detail.target.position.y;
        var zPosition = e.detail.target.position.z;

        var xDirectionAdjustment = xPosition > 0 ? -1 : 1;
        var yDirectionAdjustment = yPosition > 0 ? -1 : 1;

        if(Game.data.distance > 0) {
          document.querySelector('#character').setAttribute('position', {
            x: xPosition + (5 * xDirectionAdjustment),
            y: yPosition + (5 * yDirectionAdjustment),
            z: zPosition
          });  
        }        
      }

      if (collidedWithEl.hasAttribute('shark')) {
        // console.log('Eaten by Shark');
        Game.endGame();
      }

      if(collidedWithEl.hasAttribute('tunnel-checkpoint')) {
        collidedWithEl.components['tunnel-checkpoint'].handleCollision();
      }

    });
  },
  tick : function() {
      var Game = document.querySelector('a-scene').systems['game'];

      if(Game.data.hasStarted) {
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
  }
});
