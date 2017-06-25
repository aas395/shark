AFRAME.registerComponent('obstacles-container', {
  init: function () {
    var obstacles = [
      {
        "mixin": "build",
      },
      {
        "mixin": "build"
      },
      {
        "mixin": "build"
      },
      {
        "mixin": "build"
      },
      {
        "mixin": "build"
      },
      {
        "mixin": "build"
      }
    ];

    for(var i = 0; i < obstacles.length; i++) {
      var currentObstacle = obstacles[i];
      var building = document.createElement('a-entity');

      var depth = 40;
      var width = 40;
      var height = 40;

      currentObstacle.geometry = "depth:" + depth + "; width:" + width + "; height: " + height + ";";

      var signOfX = Math.random() >= 0.5 ? -1 : 1;
      var positionX = Math.floor(Math.random() * 50) * signOfX;

      var signOfY = Math.random() >= 0.5 ? -1 : 1;
      var positionY = Math.floor(Math.random() * 50) * signOfY;

      var positionZ = -Math.floor(Math.random() * 1000) - 500;

      currentObstacle.position = positionX + " " + positionY + " " + positionZ;

      for(var key in currentObstacle) {
        var newAttribute = document.createAttribute(key);
        newAttribute.value = currentObstacle[key];
        building.setAttributeNode(newAttribute);
      }

      this.el.appendChild(building);
    }
  },
  tick: function() {
    // this.data.score++;
  }
});