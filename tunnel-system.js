AFRAME.registerSystem('tunnel', {
  schema: {
    length: {
      type: 'number',
      default: 500
    },
    radius: {
      type: 'number',
      default: 100
    }
  },
  add: function() {
    var tunnel = document.createElement('a-entity');

    tunnel.setAttribute('mixin', 'tunnel');
    tunnel.setAttribute('geometry', {
      height: this.data.length,
      radius: this.data.radius
    });

    tunnel.setAttribute('position', {
      x: 0,
      y: 0,
      z: -this.data.length + (this.data.length / 2)
    });

    document.querySelector('#level-container').appendChild(tunnel);
  }
});
