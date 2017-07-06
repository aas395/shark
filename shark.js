AFRAME.registerComponent('shark', {
	schema: {
		forwardMotionRate: {
			type: 'number',
			default: 0
		},
		angularMotionRate: {
			type: 'number',
			default: .2
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
				angularMotionRate: 0,
				jsonModel: '#shark-model1' // these don't move on the x/y axis
			},
			'hammerhead': {
				forwardMotionRate: 1,
				angularMotionRate: 2,
				jsonModel: '#shark-model2'
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
			console.log('species change');
		}
	},
	updateSpeed(speed) {
		this.sharkSpeed = speed
	},
	tick: function() {
		var Game = document.querySelector('a-scene').systems['game'];

		if(Game.data.hasStarted) {

			var currentPosition = this.el.getAttribute('position');
			var player = document.querySelector('#character');
			var playerPosition = player.getAttribute('position');
			var newPosition = {x: 0, y: 0, z: 0};
			var tunnel = document.querySelector('#tunnel');
			var tunnelGeometry = tunnel.components['geometry'];
			var tunnelRadius = tunnelGeometry.data.radius;

			newPosition = {
				x: currentPosition.x,
				y: currentPosition.y,
				z: currentPosition.z + this.sharkSpeed
			}
			


			// console.log(this.data.species);
			if(this.data.species == 'hammerhead') {
				
				var xPositionDiff = playerPosition.x > currentPosition.x ? playerPosition.x - currentPosition.x : currentPosition.x - playerPosition.x;
				var yPositionDiff = playerPosition.y > currentPosition.y ? playerPosition.y - currentPosition.y : currentPosition.y - playerPosition.y;
				var zPositionDiff = playerPosition.z - currentPosition.z;

				var xMovementDirection = playerPosition.x > currentPosition.x ? 1 : -1;
				var yMovementDirection = playerPosition.y > currentPosition.y ? 1 : -1;

				var xMotionRate = this.data.angularMotionRate;
				var yMotionRate = this.data.angularMotionRate;

				if(xPositionDiff < 10) {
					xMotionRate = 0;
				}

				if(yPositionDiff < 10) {
					yMotionRate = 0;
				}

				newPosition = {
					x: currentPosition.x + (xMotionRate * xMovementDirection) * (this.sharkSpeed * .75),
					y: currentPosition.y + (yMotionRate * yMovementDirection) * (this.sharkSpeed * .75),
					z: currentPosition.z + this.sharkSpeed
				};

				//turn the sharks towards us if they're within a certain distance
				if(zPositionDiff > 70) {
					//Math... we get the sine of this angle by doing opposite/hypotenuse
					// then we can multiply that by 180/Math.PI to get degrees
					var xRotationAngle = (xPositionDiff/zPositionDiff) * (180/Math.PI) * xMovementDirection;
					var yRotationAngle = (yPositionDiff/zPositionDiff) * (180/Math.PI) * yMovementDirection;
					this.el.setAttribute('rotation', {x: -yRotationAngle, y: xRotationAngle, z: 0});	
				}
			}


			if(currentPosition.z >= 50) {
				var tunnelHeight = tunnelGeometry.data.height;

				newPosition = {
					x: this.system.getRandomYCoordinate(),
					y: this.system.getRandomXCoordinate(),
					z: -tunnelHeight
				}

				var randomNumber = Math.floor(Math.random() * 3);

				//1/5 times, send a shark right at the player
				if(randomNumber == 2) {
					newPosition = {
						x: playerPosition.x,
						y: playerPosition.y,
						z: -tunnelHeight/2
					}
				}

				//if level > 1, create hammerheads
				if(Game.data.level > 2) {
					var randomNumberSpecies = Math.floor(Math.random() * 2);

					if(randomNumberSpecies == 0) {
						this.data.species = 'hammerhead';
						this.el.setAttribute('json-model', 'src', '#shark-model2');
						console.log('now a hammerhead')
					} else {
						this.el.setAttribute('rotation', '0 0 0');
						// console.log('this shark is now a great white');
						this.data.species = 'greatwhite';
					}
				}

			}

			this.el.setAttribute('position', newPosition);

			this.lastPosition = newPosition;
		}
	}
});
