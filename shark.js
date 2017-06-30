AFRAME.registerComponent('shark', {
	schema: {
		forwardMotionRate: {
			type: 'number',
			default: 0
		},
		angularMotionRate: {
			type: 'number',
			default: 0
		},
		species: {
			type: 'string',
			default: 'greatwhite'
		}
	},
	init: function () {
		var self = this;
		var Game = document.querySelector('a-scene').systems['game'];

		this.speciesSettings = {
			'greatwhite' : {
				forwardMotionRate: 1,
				angularMotionRate: 0 // these don't move on the x/y axis
			},
			'hammerhead': {
				forwardMotionRate: 1,
				angularMotionRate: 2
			}
		};

		//don't use this.data.forwardMotionRate -- something buggy happens when that's updated frequently
		this.sharkSpeed = 1;
		this.lastPosition = {x: 0, y: 0, z: 0};
		self.el.setAttribute('visible', 'false');
		
		//hacky way to prevent the white flashes while spawning new sharks
		self.el.addEventListener('model-loaded', function() {
			setTimeout(function(){
				self.el.setAttribute('visible', 'true');
			}, 0)
		});

		self.el.addEventListener('collide', function() {
			Game.endGame();
		});

		self.el.sceneEl.addEventListener('gameend', function() {
	      self.updateSpeed(Game.data.levelSettings[Game.data.level].sharkSpeed);
	    });

	    self.el.sceneEl.addEventListener('gamestart', function() {
			self.updateSpeed(Game.data.levelSettings[Game.data.level].sharkSpeed);
	    });

	    self.el.sceneEl.addEventListener('gamelevelincrease', function() {
	    	if(typeof Game.data.levelSettings[Game.data.level] !== 'undefined') {
	    		self.updateSpeed(Game.data.levelSettings[Game.data.level].sharkSpeed);	
	    	}
	    });
	},
	schemaUpdated: function(newData) {
		if(newData.species != this.data.species) {
			console.log('species change')
		}
	},
	updateSpeed(speed) {
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
			
			if(currentPosition.z >= 0) {
				var tunnel = document.querySelector('#tunnel');
				newPosition = {
					x: this.system.getRandomYCoordinate(),
					y: this.system.getRandomXCoordinate(),
					z: -tunnel.components['geometry'].data.height
				}

				var randomNumber = Math.floor(Math.random() * 4);

				//1/5 times, send a shark right at the player
				if(randomNumber == 3) {
					var player = document.querySelector('#character');
					var playerPosition = player.getAttribute('position');

					newPosition = {
						x: playerPosition.x,
						y: playerPosition.y,
						z: -tunnel.components['geometry'].data.height
					}
				}

				//if level > 1, create hammerheads
				// if(Game.data.level > 1) {
					var coinFlip = Math.floor(Math.random() * 2);

					if(coinFlip == 0) {
						// console.log('this shark is now a great white');
						this.data.species == 'greatwhite';
					} else {
						// console.log('this shark is now a hammerhead');
						this.data.species == 'hammerhead';
					}
				// }

			}

			this.el.setAttribute('position', newPosition);

			this.lastPosition = newPosition;
		}
	}
});
