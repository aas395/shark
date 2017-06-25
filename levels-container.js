AFRAME.registerComponent('levels-container', {
  init: function () {
    this.addLevel();
  },
  tick: function() {
    // this.data.score++;
  },
  addLevel: function() {
    var newLevel = document.createElement('a-entity');
    newLevel.setAttribute('mixin', 'level');
    this.el.appendChild(newLevel);
  }
});