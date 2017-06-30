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

		self.el.setAttribute('visible', 'false');

		//hacky way to prevent the white flashes while spawning new sharks
		self.el.addEventListener('model-loaded', function() {
			setTimeout(function(){
				self.el.setAttribute('visible', 'true');
			}, 0)
		});

		self.el.addEventListener('collide', function(e) {
			self.el.setAttribute('visible', 'false');
			Game.endGame();
			setTimeout(function(){ self.el.setAttribute('visible', 'true'); }, 5000);
		});

		this.sharkSpeed = 1;

		this.lastPosition = {x: 0, y: 0, z: 0};
	},
	updateSpeed(speed) {
		// this.data.forwardMotionRate = speed;
		this.sharkSpeed = speed;
	},
	tick: function() {
		var currentPosition = this.el.getAttribute('position');
		var Game = document.querySelector('a-scene').systems['game'];
		var newPosition = {x: 0, y: 0, z: 0};

		if(Game.data.hasStarted) {

			newPosition = {
				x: currentPosition.x,
				y: currentPosition.y,
				z: currentPosition.z + this.sharkSpeed
			}
			// if(this.lastPosition.z == newPosition.z) {
			// 	console.log(currentPosition);
			// 	console.log(this.data.forwardMotionRate);
			// 	console.log(newPosition);
			// 	throw 'problem';
			// }
			if(currentPosition.z >= 0) {
				var tunnel = document.querySelector('#tunnel');
				newPosition = {
					x: this.system.getRandomYCoordinate(),
					y: this.system.getRandomXCoordinate(),
					z: -tunnel.components['geometry'].data.height
				}

				var randomNumber = Math.floor(Math.random() * 10);

				//1/10 times, send a shark right at the player
				if(randomNumber == 5) {
					var player = document.querySelector('#character');
					var playerPosition = player.getAttribute('position');

					newPosition = {
						x: playerPosition.x,
						y: playerPosition.y,
						z: -tunnel.components['geometry'].data.height
					}
				}
			}

			this.el.setAttribute('position', newPosition);



			this.lastPosition = newPosition;
		}
	},
	multiple: true
});
