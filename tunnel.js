AFRAME.registerComponent('tunnel', {
	init: function () {
		var self = this;

		self.el.setAttribute('visible', 'false');

		self.el.addEventListener('loaded', function() {
			self.el.setAttribute('visible', 'true');
		});

		var sides = ['right', 'left', 'front', 'back'];

		sides.forEach(function(sideName) {
			var wall = document.createElement('a-entity');
			wall.setAttribute('tunnel-wall', {
				target: '[tunnel]',
				side: sideName
			});
			self.el.appendChild(wall);
		});

		this.el.addEventListener('collide', function(e){
			// console.log(e);
			// console.log('collide')
		});
	}
});