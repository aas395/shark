AFRAME.registerComponent('tunnel', {
	init: function () {
		var self = this;
		self.el.setAttribute('visible', 'false');

		self.el.addEventListener('loaded', function() {
			self.el.setAttribute('visible', 'true');
		});
	}
});