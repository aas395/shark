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
			var shark = document.createElement('a-entity');

			shark.setAttribute('class', 'shark');
			shark.setAttribute('scale', '5 5 5');
			shark.setAttribute('rotation', '0 0 0');
			shark.setAttribute('animation-mixer', 'clip: swim;');
			shark.setAttribute('json-model', {src: 'url(https://cdn.rawgit.com/brendanluu/brendanluu.github.io/407d10d6/assets/sharky.json)'});

			building.appendChild(shark);
/*<a-entity class="obstacle" static-body geometry="primitive: box" material="color: transparent; " obstacle>
	<a-entity class="shark"
		scale="5 5 5"
		rotation="0 0 0"
		animation-mixer="clip: swim"
		json-model="src: url(https://cdn.rawgit.com/brendanluu/brendanluu.github.io/407d10d6/assets/sharky.json);"
	></a-entity>
</a-entity> */

			var depth = 51;
			var width = 32;
			var height = 18;

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
