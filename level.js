AFRAME.registerComponent('level', {
	init: function () {
		//add tunnels
		document.querySelector('a-scene').systems['tunnel'].initTunnel();

		//add obstacles
		this.system.initObstacles();
	}
});
