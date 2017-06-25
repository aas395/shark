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
	    },
	    tunnelRadius: {
	      type : "number",
	      default : 100
	    }
	},
	multiple: true,
	init: function () {
		var Game = document.querySelector('a-scene').systems['game'];
		var prevLevel = document.querySelectorAll('[mixin=level]')[0];
		console.log(prevLevel.components)
		this.data.levelStart = Game.data.level > 0 ? prevLevel.components.level.data.levelEnd : 0;
		this.data.levelLength = Game.data.level ? this.data.levelLength * (Game.data.level * 1.2) : this.data.levelLength;
		this.data.levelEnd = this.data.levelStart + this.data.levelLength;
		console.log(this.data.levelStart)
		console.log(this.data.levelEnd);

		var bufferDistance = Game.data.level == 0 ? 250 : 0;

		this.addTunnel();
		this.addObstacles({ bufferDistance:  bufferDistance });
	},
	addTunnel: function() {
		var levelLength = this.data.levelLength;
		var tunnel = document.createElement('a-entity');

		tunnel.setAttribute('mixin', 'tunnel');
		tunnel.setAttribute('geometry', {
			primitive: 'cylinder',
			height: levelLength,
			radius: this.data.tunnelRadius,
			openEnded: true
		});

		tunnel.setAttribute('position', {
			x: 0,
			y: 0,
			z: -this.data.levelStart - (levelLength / 2)
		});

		this.el.appendChild(tunnel);
		this.addLevelCheckpoints();
	},
	addLevelCheckpoints: function() {
		//level start
		//increments level number and speed
		var levelStartPlane = document.createElement('a-plane');
		levelStartPlane.setAttribute('position', {
			x: 0,
			y: 0,
			z: -this.data.levelStart
		});

		levelStartPlane.setAttribute('height', this.data.tunnelRadius * 2);
		levelStartPlane.setAttribute('width', this.data.tunnelRadius * 2);
		levelStartPlane.setAttribute('static-body', '');
		levelStartPlane.setAttribute('material', {opacity: 0});
		levelStartPlane.setAttribute('tunnel-checkpoint', 'type: start');
		
		this.el.appendChild(levelStartPlane);

		//level 1/4
		//removes previous level and objects
		var levelOneQuarterPlane = document.createElement('a-plane');
		levelOneQuarterPlane.setAttribute('position', {
			x: 0,
			y: 0,
			z: -this.data.levelStart -Math.floor(this.data.levelLength * .25)
		});

		levelOneQuarterPlane.setAttribute('height', this.data.tunnelRadius * 2);
		levelOneQuarterPlane.setAttribute('width', this.data.tunnelRadius * 2);
		levelOneQuarterPlane.setAttribute('static-body', '');
		levelOneQuarterPlane.setAttribute('material', {opacity: 0});
		levelOneQuarterPlane.setAttribute('tunnel-checkpoint', 'type: one-quarter');
		
		this.el.appendChild(levelOneQuarterPlane);


		//level 3/4
		//loads next level and objects
		var levelThreeQuarterPlane = document.createElement('a-plane');
		levelThreeQuarterPlane.setAttribute('position', {
			x: 0,
			y: 0,
			z: -this.data.levelStart -Math.floor(this.data.levelLength * .75)
		});

		levelThreeQuarterPlane.setAttribute('height', this.data.tunnelRadius * 2);
		levelThreeQuarterPlane.setAttribute('width', this.data.tunnelRadius * 2);
		levelThreeQuarterPlane.setAttribute('static-body', '');
		levelThreeQuarterPlane.setAttribute('material', {opacity: 0});
		levelThreeQuarterPlane.setAttribute('tunnel-checkpoint', 'type: three-quarter');
		
		this.el.appendChild(levelThreeQuarterPlane);
	},
	addObstacles: function(params) {

		var bufferDistance = 0;

		if(typeof params.bufferDistance != 'undefined') {
			bufferDistance = params.bufferDistance;
		}

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

			var positionZ = -this.data.levelStart -bufferDistance + -Math.floor(Math.random() * (this.data.levelEnd - bufferDistance));

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
