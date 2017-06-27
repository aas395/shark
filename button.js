AFRAME.registerComponent('cursor-listener', {
	schema: {
		target: {
			type: "selector"
		}
	},
	init: function () {
		var Game = document.querySelector('a-scene').systems['game'];
		var that = this;

		this.el.addEventListener('mouseenter', function (evt) {
			document.querySelector('#status-bar-progress').emit('button-mouseover');
		});

		this.el.addEventListener('mouseleave', function (evt) {
			document.querySelector('#status-bar-progress').emit('button-mouseout');
		});

		this.el.addEventListener('click', function (evt) {
			Game.startGame();
		});
	}
});
