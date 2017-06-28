AFRAME.registerComponent('tunnel', {
	init: function () {
		var self = this;
		self.el.setAttribute('visible', 'false');

		self.el.addEventListener('loaded', function() {
			self.el.setAttribute('visible', 'true');
		});

		self.el.addEventListener('collide', function() {
			console.log('collided with wall');
			var Game = document.querySelector('a-scene').systems['game'];
			var player = document.querySelector('#character');

			var playerPosition = player.getAttribute('position');
	        var xPosition = playerPosition.x;
	        var yPosition = playerPosition.y;
	        var zPosition = playerPosition.z;

	        var xDirectionAdjustment = xPosition > 0 ? -1 : 1;
	        var yDirectionAdjustment = yPosition > 0 ? -1 : 1;

	        if(Game.data.distance > 0) {
	          player.setAttribute('position', {
	            x: xPosition + (5 * xDirectionAdjustment),
	            y: yPosition + (5 * yDirectionAdjustment),
	            z: zPosition
	          });  
	        }      
		});
	},
	multiple: true
});