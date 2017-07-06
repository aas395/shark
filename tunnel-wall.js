/* used to inscribe a box made of planes inside the tunnel to allow
collision detection with the walls to work like we want it to */

AFRAME.registerComponent('tunnel-wall', {
  schema: {
    target: {
      type: 'selector'
    },
    section: {
      type: 'string'
    }
  },
  init: function() {
    var radius = this.data.target.getAttribute('geometry').radius;
    var side = this.data.side;
    var hypotenuseLength = Math.sqrt(Math.pow(radius, 2) + Math.pow(radius, 2));

    this.el.setAttribute('static-body', '');

    this.el.setAttribute('geometry', {
      width: hypotenuseLength,
      height: hypotenuseLength,
      primitive: 'plane'
    });

    this.el.setAttribute('material', {
      transparent: true,
      opacity: 0,
      side: 'both'
    });

    if(side == 'right') {
      this.el.setAttribute('position', {
        x: hypotenuseLength/2,
        y: 0,
        z: 0
      });
      this.el.setAttribute('rotation', {
        x: 0,
        y: -90,
        z: 0
      });
    } else if(side == 'left') {
      this.el.setAttribute('position', {
        x: -hypotenuseLength/2,
        y: 0,
        z: 0
      });
      this.el.setAttribute('rotation', {
        x: 0,
        y: 90,
        z: 0
      });
    } else if(side == 'front') {
      this.el.setAttribute('position', {
        x: 0,
        y: 0,
        z: hypotenuseLength/2
      });
      this.el.setAttribute('rotation', {
        x: 0,
        y: 180,
        z: 0
      });
    } else if(side == 'back') {
      this.el.setAttribute('position', {
        x: 0,
        y: 0,
        z: -hypotenuseLength/2
      });
      this.el.setAttribute('rotation', {
        x: 0,
        y: 0,
        z: 90
      });
    }

    this.el.addEventListener('collide', function(e){
      console.log('collide')
    });
  }
});