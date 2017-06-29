AFRAME.registerComponent('shark', {
	schema: {
		forwardMotionRate: {
			type: 'number',
			default: 0
		}
	},
	init: function () {
		var self = this;
		var Game = document.querySelector('a-scene').systems['game'];
		var Level = document.querySelector('a-scene').systems['level'];

		self.el.setAttribute('visible', 'false');
		
		//hacky way to prevent the white flashes while spawning new sharks
		self.el.addEventListener('model-loaded', function() {
			setTimeout(function(){
				self.el.setAttribute('visible', 'true');
			}, 0)
		});

		self.el.addEventListener('collide', function(e) {
			Game.endGame();
		});
	},
	updateSpeed(speed) {
		this.data.forwardMotionRate = speed;
	},
	tick: function() {
		var currentPosition = this.el.getAttribute('position');
		this.el.setAttribute('position', {
			x: currentPosition.x,
			y: currentPosition.y,
			z: currentPosition.z + this.data.forwardMotionRate
		});
	},
	multiple: true
});
