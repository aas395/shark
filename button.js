AFRAME.registerComponent('cursor-listener', {
	schema: {
		target: {
			type: "selector"
		}
	},
	init: function () {
		var Game = document.querySelector('a-scene').systems['game'];
		var self = this;

		self.el.addEventListener('mouseenter', function (evt) {
			document.querySelector('#status-bar-progress').emit('button-mouseover');
		});

		self.el.addEventListener('mouseleave', function (evt) {
			document.querySelector('#status-bar-progress').emit('button-mouseout');
		});

		self.el.addEventListener('click', function (evt) {
			Game.startGame();
		});
	}
});
