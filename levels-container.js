AFRAME.registerComponent('levels-container', {
  init: function () {
    this.addLevel();
  },
  addLevel: function() {
    var newLevel = document.createElement('a-entity');
    newLevel.setAttribute('mixin', 'level');
    this.el.appendChild(newLevel);
  },
  removeLevel: function(level) {
  	console.log('removing level');
  	console.log(level);
  	this.el.removeChild(level);
  }
});