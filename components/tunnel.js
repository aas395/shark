AFRAME.registerComponent('tunnel', {
  init: function () {
    var Game = document.querySelector('a-scene').systems['game'];
    // Game.setLevelEnd(Game.data.levelStart + this.el[0]);
    console.log(this.el[0])
  },
  tick: function() {
    // this.data.score++;
  }
});