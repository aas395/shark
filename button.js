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
			var animation = document.createElement("a-animation");
			animation.setAttribute("begin", "cursor-fusing");
			animation.setAttribute("easing", "ease-in");
			animation.setAttribute("attribute", "scale");
			animation.setAttribute("fill", "forwards");
			animation.setAttribute("from", "0.1 0.1 0.1");
			animation.setAttribute("to", "0.05 0.05 0.05");
			animation.setAttribute("dur", 1200);
			animation.setAttribute("id", "cursor-animation");
			that.data.target.appendChild(animation);
		});

		this.el.addEventListener('mouseleave', function (evt) {
			var cursorAnimation = document.querySelector('#cursor-animation');
			document.querySelector('#cursor').removeChild(cursorAnimation);
		});

		this.el.addEventListener('click', function (evt) {
			console.log('click');
			Game.startGame();
		});
	}
});
