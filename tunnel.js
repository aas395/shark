AFRAME.registerComponent('tunnel', {
	init: function () {
		var self = this;
		self.el.setAttribute('visible', 'false');

		self.el.addEventListener('loaded', function() {
			console.log('loaded')
			self.el.setAttribute('visible', 'true');
		});
	},
	multiple: true
});