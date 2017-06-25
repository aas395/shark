AFRAME.registerComponent('tunnel', {
  init: function () {
    var Game = document.querySelector('a-scene').systems['game'];

    // Game.setLevelEnd(Game.data.levelStart + this.el.getAttribute('geometry').height);
  },
  tick: function() {
    // this.data.score++;
  }
});