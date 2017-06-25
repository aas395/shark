AFRAME.registerComponent('tunnels-container', {
  init: function () {
    // this.addTunnel();
    var Game = document.querySelector('a-scene').systems['game'];
  },
  tick: function() {
    // this.data.score++;
  },
  addTunnel: function() {
    var newTunnel = document.createElement('a-entity');
    newTunnel.setAttribute('mixin', 'tunnel');
    this.el.appendChild(newTunnel);
  }
});