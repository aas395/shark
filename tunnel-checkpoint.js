AFRAME.registerComponent('tunnel-checkpoint', {
	schema: {
		type: {
			type: 'string',
			default: 'start'
		}
	},
	init: function () {

	},
	handleCollision: function() {
		var Game = document.querySelector('a-scene').systems['game'];

		if(this.data.type == 'start') {
			Game.data.level++;

			console.log('New level entered: Level ' + Game.data.level);

			if(Game.data.level > 1) {

			}
		}

		if(this.data.type == 'one-quarter') {
			console.log('one-quarter crossed');
			document.querySelector('[levels-container]').components['levels-container'].addLevel();
		}
	},
	multiple: true
});
