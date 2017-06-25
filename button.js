AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var Game = document.querySelector('a-scene').systems['game'];
    this.el.addEventListener('click', function (evt) {
      Game.startGame();
    });
  }
});
