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
			console.log('New level entered');
			if(Game.data.level == 1) {
				console.log('Level 1 entered');
			}
		}
	},
	multiple: true
});
