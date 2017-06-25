AFRAME.registerComponent('level', {
	schema: {
		levelStart: {
	      type : "number",
	      default : 0
	    },
	    levelLength: {
	      type : "number",
	      default : 1500
	    },
	    levelEnd: {
	      type : "number",
	      default : 0
	    },
	    distance: {
	      type : "number",
	      default : 0
	    },
	    numObstacles: {
	      type : "number",
	      default : 10
	    }
	},
	multiple: true,
	init: function () {
		this.data.levelLength = this.data.levelLength;
		this.data.levelEnd = this.data.levelStart + this.data.levelLength;

		this.addTunnel();
		this.addObstacles();
	},
	addTunnel: function() {
		var levelLength = this.data.levelLength;
		var tunnel = document.createElement('a-entity');

		tunnel.setAttribute('mixin', 'tunnel');
		tunnel.setAttribute('geometry', {
			primitive: 'cylinder',
			height: levelLength,
			radius: 100,
			openEnded: true
		});

		tunnel.setAttribute('position', {
			x: 0,
			y: 0,
			z: -(levelLength / 2)
		});

		this.el.appendChild(tunnel);
	},
	addObstacles: function() {
		var obstaclesContainer = document.createElement('a-entity');

		for(var i = 0; i < this.data.numObstacles; i++) {
			var currentObstacle = {};

			var building = document.createElement('a-entity');
			building.setAttribute('mixin', 'obstacle');
			var shark = document.createElement('a-entity');

			shark.setAttribute('class', 'shark');
			shark.setAttribute('scale', '5 5 5');
			shark.setAttribute('rotation', '0 0 0');
			shark.setAttribute('animation-mixer', 'clip: swim;');
			shark.setAttribute('json-model', {src: 'url(https://cdn.rawgit.com/brendanluu/brendanluu.github.io/407d10d6/assets/sharky.json)'});

			building.appendChild(shark);

			var depth = 51;
			var width = 32;
			var height = 18;

			currentObstacle.geometry = "depth:" + depth + "; width:" + width + "; height: " + height + ";";

			var signOfX = Math.random() >= 0.5 ? -1 : 1;
			var positionX = Math.floor(Math.random() * 50) * signOfX;

			var signOfY = Math.random() >= 0.5 ? -1 : 1;
			var positionY = Math.floor(Math.random() * 50) * signOfY;

			var positionZ = -Math.floor(Math.random() * this.data.levelEnd) - 500;

			currentObstacle.position = positionX + " " + positionY + " " + positionZ;

			for(var key in currentObstacle) {
				var newAttribute = document.createAttribute(key);
				newAttribute.value = currentObstacle[key];
				building.setAttributeNode(newAttribute);
			}

			obstaclesContainer.appendChild(building);
		}

		this.el.appendChild(obstaclesContainer);
	},
	setLevelStart: function(start) {
    	this.data.levelStart = start;
	},
	setLevelEnd: function(end) {
		this.data.levelEnd = end;
	}
});
