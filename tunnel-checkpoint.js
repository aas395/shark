AFRAME.registerComponent('tunnel-checkpoint', {
	schema: {
		type: {
			type: 'string',
			default: 'start'
		}
	},
	init: function () {
		var self = this;

		self.el.addEventListener('collide', function(){
			self.handleCollision();
		});
	},
	handleCollision: function() {
		var Game = document.querySelector('a-scene').systems['game'];

		if(this.data.type == 'start') {
			Game.data.level++;
			console.log('New level entered: Level ' + Game.data.level);
		}

		if(this.data.type == 'one-quarter') {
			console.log('one-quarter crossed');
			document.querySelector('[levels-container]').components['levels-container'].addLevel();
			
			if(Game.data.level > 1) {
				var oldLevel = document.querySelectorAll('[mixin=level]')[Game.data.level - 1];
				oldLevel.remove();
			}
		}
	},
	multiple: true
});
