AFRAME.registerComponent('level', {
	schema: {
		levelStart: {
	      type : "number",
	      default : 0
	    },
	    levelLength: {
	      type : "number",
	      // default : 1500
	      default : 500
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
		var prevLevel = document.querySelectorAll('[mixin=level]')[Game.data.level - 1];

		this.data.levelStart = Game.data.level > 0 ? prevLevel.components.level.data.levelEnd : 0;
		this.data.levelLength = Game.data.level ? this.data.levelLength * (Game.data.level * 1.2) : this.data.levelLength;
		this.data.levelEnd = this.data.levelStart + this.data.levelLength;
		
		var bufferDistance = Game.data.level == 0 ? 250 : 0;

		document.querySelector('a-scene').systems['tunnel'].add();
		this.addObstacles({ bufferDistance:  bufferDistance });
	},
	addObstacles: function(params) {

		var bufferDistance = 0;

		if(typeof params.bufferDistance != 'undefined') {
			bufferDistance = params.bufferDistance;
		}

		var obstaclesContainer = document.createElement('a-entity');

		for(var i = 0; i < this.data.numObstacles; i++) {

			var signOfX = Math.random() >= 0.5 ? -1 : 1;
			var positionX = Math.floor(Math.random() * 50) * signOfX;

			var signOfY = Math.random() >= 0.5 ? -1 : 1;
			var positionY = Math.floor(Math.random() * 50) * signOfY;

			var positionZ = -this.data.levelStart -bufferDistance + -Math.floor(Math.random() * (this.data.levelEnd - bufferDistance));

			var shark = document.createElement('a-entity');

			shark.setAttribute('position', {x: positionX, y: positionY, z: positionZ});
			shark.setAttribute('mixin', 'shark');

			obstaclesContainer.appendChild(shark);
		}
		obstaclesContainer.setAttribute('obstacles-container', '');
		this.el.appendChild(obstaclesContainer);
		var self = this;
	},
	removeObstacles: function() {
		var children = this.el.childNodes;

		for(var i = 0; i < children.length; i++) {
			var child = children[i];

			if(child.hasAttribute('obstacles-container')) {
				var obstacles = children[i].childNodes;
				
				for(var j = 0; j < obstacles.length; j++) {
					obstacles[j].pause();
					child.removeChild(obstacles[j]);
				}

				break;
			}
		}
	},
	setLevelStart: function(start) {
    	this.data.levelStart = start;
	},
	setLevelEnd: function(end) {
		this.data.levelEnd = end;
	},
	remove: function() {
		// this.el.pause();
		// this.removeObstacles();
		// this.el.parent.removeChild(this.el);
	}
});
