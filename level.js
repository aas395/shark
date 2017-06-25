AFRAME.registerComponent('level', {
	schema: {
		levelStart: {
	      type : "number",
	      default : 0
	    },
	    levelEnd: {
	      type : "number",
	      default : 0
	    }
	},
	multiple: true,
	init: function () {
		// var Game = document.querySelector('a-scene').systems['game'];

		// Game.setLevelEnd(Game.data.levelStart + this.el.getAttribute('geometry').height);
		this.addTunnel();
		this.addObstacles();
	},
	tick: function() {
		// this.data.score++;
	},
	addTunnel: function() {
		var tunnel = document.createElement('a-entity');
		tunnel.setAttribute('mixin', 'tunnel');
		this.el.appendChild(tunnel)
	},
	addObstacles: function() {
		var obstaclesContainer = document.createElement('a-entity');

		var obstacles = [
		{
			"mixin": "obstacle",
		},
		{
			"mixin": "obstacle"
		},
		{
			"mixin": "obstacle"
		},
		{
			"mixin": "obstacle"
		},
		{
			"mixin": "obstacle"
		},
		{
			"mixin": "obstacle"
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
			// console.log(document.querySelector('[tunnel]'));
			obstaclesContainer.appendChild(building);
		}
		this.el.appendChild(obstaclesContainer);
	},
	setLevelStart: function(start) {
    	this.data.levelStart = start;
	},
	setLevelEnd: function(end) {
		this.data.levelEnd = end;
		// console.log(this.data.levelEnd)
	}
});