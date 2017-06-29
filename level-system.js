AFRAME.registerSystem('level', {
  schema: {
    bufferDistance: {
      type: 'number',
      default: 200
    },
    numObstacles: {
      type: 'number',
      default: 10
    }
  },
  init() {
    this.levelSettings = [
      {
        start: 0,
        length: 1500,
        end: 1500,
        sharkSpeed: 1
      }
    ];
  },
  initObstacles: function() {
    var obstaclesContainer = document.querySelector('#obstacles-container');

    for(var i = 0; i < this.data.numObstacles; i++) {
      // @TODO
      // move shark position setting into shark system
      var Tunnel = document.querySelector('a-scene').systems['tunnel'];
      var shark = document.createElement('a-entity');

      var signOfX = Math.random() >= 0.5 ? -1 : 1;
      var positionX = Math.floor(Math.random() * 50) * signOfX;

      var signOfY = Math.random() >= 0.5 ? -1 : 1;
      var positionY = Math.floor(Math.random() * 50) * signOfY;

      var positionZ = -this.data.bufferDistance - Math.floor(Math.random() * (Tunnel.data.length - this.data.bufferDistance));
      
      shark.setAttribute('position', {x: positionX, y: positionY, z: positionZ});
      shark.setAttribute('mixin', 'shark');

      obstaclesContainer.appendChild(shark);
    }
  }
});
