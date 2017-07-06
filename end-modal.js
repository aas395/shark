AFRAME.registerComponent("end-modal", {
  init: function() {
    var self = this;
    var scene = self.el.sceneEl;
    var Game = document.querySelector('a-scene').systems['game'];

    scene.addEventListener('gameend', function() {
      self.el.setAttribute('visible', true);
    });

    scene.addEventListener('gameendtimerchange', function(e) {
      var countdownEl = document.querySelector('#countdown');
      
      if(e.detail.timeRemaining == 0) {
        countdownEl.setAttribute('text', {align: "center",  value: "" + Game.data.endModalTimerStart });
      } else {
        countdownEl.setAttribute('text', {align: "center",  value: "" + e.detail.timeRemaining });  
      }
    });

    scene.addEventListener('gamereset', function() {
      self.el.setAttribute('visible', false);
    });
  }
});
