AFRAME.registerComponent('shark', {
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
			Game.endGame();
		});
	},
	multiple: true
});
