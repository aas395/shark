AFRAME.registerSystem('game', {
  schema: {
    score: {
      type: "number",
      default: 0
    },
    distance: {
      type: "number",
      default: 0
    },
    time: {
      type: "number",
      default: 0
    },
    hasStarted: {
      type: "boolean",
      default: false
    },
    forwardMotionCoefficient: {
      type : "number",
      default : 0
    },
    currentLevel: {
      type : "number",
      default : 1
    },
    levelStart: {
      type : "number",
      default : 0
    },
    levelEnd: {
      type : "number",
      default : 0
    }
  },  // System schema. Parses into `this.data`.
  init: function () {
    // this.el.appendChild('<a-entity physics-body="static-body" mixin="build" geometry="depth: 150; width: 150; height: 140;" position="110 69 1500" material="src: url(https://cdn.glitch.com/b870d9ec-1139-44f9-b462-223e4a2c74e7%2Ftexture.jpg?1490308149272)"></a-entity>')
  },
  tick: function() {
    if(this.data.hasStarted) {
      this.updateScore();
    }
  },
  setDistance: function(distance) {
    this.data.distance = -distance;
    // console.log(this.data.distance);
  },
  updateScore: function() {
    this.data.score = this.data.distance;
  },
  setLevelStart: function(start) {
    this.data.levelStart = start;
  },
  setLevelEnd: function(end) {
    this.data.levelEnd = end;
    // console.log(this.data.levelEnd)
  },
  setHasStarted: function(hasStarted) {
    this.data.hasStarted = hasStarted;
  },
  startGame: function() {
    this.data.forwardMotionCoefficient = 2;
    this.data.score = 0;
    this.data.time = 0;
    this.data.hasStarted = true;
    this.data.currentLevel = 1;

    if(document.querySelector(modal)) {
        //hide modal
    }
  }
});
