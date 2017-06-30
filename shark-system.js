AFRAME.registerSystem('shark', {
  schema: {
    bufferDistance: {
      type: 'number',
      default: 200
    },
    numObstacles: {
      type: 'number',
      default: 20
    },
    zMargin: {
      type: 'number',
      default: 100
    }
  },
  init: function() {
    var scene = document.querySelector('a-scene');
    var self = this;

    scene.addEventListener('loaded', function() {
      self.initObstacles();  
    });

    scene.addEventListener('gamereset', function() {
      self.resetObstaclePositions();
    });
  },
  initObstacles: function() {
    var obstaclesContainer = document.querySelector('#obstacles-container');
    var lastSharkPosition = {x: 0, y: 0, z: -this.data.bufferDistance};
    var tunnel = document.querySelector('#tunnel');
    var maxZ = tunnel.components['geometry'].data.height;

    for(var i = 0; i < this.data.numObstacles; i++) {
      var shark = document.createElement('a-entity');
      
      var sharkPosition = {
        x: this.getRandomXCoordinate(),
        y: this.getRandomYCoordinate(),
        z: this.getRandomZCoordinate(maxZ, lastSharkPosition.z)
      };

      shark.setAttribute('position', sharkPosition);
      shark.setAttribute('mixin', 'shark');
      obstaclesContainer.appendChild(shark);
      lastSharkPosition = sharkPosition;
    }
  },
  resetObstaclePositions: function() {
    var self = this;
    var tunnel = document.querySelector('#tunnel');
    var maxZ = tunnel.components['geometry'].data.height;
    var sharks = document.querySelectorAll('[mixin=shark]');
    var lastSharkPosition = {x: 0, y: 0, z: -this.data.bufferDistance};

    sharks.forEach(function(shark) {
      var sharkPosition = {
        x: self.getRandomXCoordinate(),
        y: self.getRandomYCoordinate(),
        z: self.getRandomZCoordinate(maxZ, lastSharkPosition.z)
      };

      shark.setAttribute('position', sharkPosition);
      lastSharkPosition = sharkPosition;
    });
  },
  getRandomXCoordinate: function() {
    var signOfX = Math.random() >= 0.5 ? -1 : 1;
    var positionX = Math.floor(Math.random() * 45) * signOfX;

    return positionX;
  },
  getRandomYCoordinate: function() {
    var signOfY = Math.random() >= 0.5 ? -1 : 1;
    var positionY = Math.floor(Math.random() * 45) * signOfY;
    
    return positionY;
  },
  getRandomZCoordinate: function(maxZ, lastSharkZ) {
    var positionZ = lastSharkZ - this.data.zMargin - Math.floor(Math.random() * 150);
    return positionZ;
  }
});