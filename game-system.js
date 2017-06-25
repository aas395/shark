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
  setHasStarted: function(hasStarted) {
    this.data.hasStarted = hasStarted;
  },
  startGame: function() {
    this.data.forwardMotionCoefficient = 2;
    this.data.score = 0;
    this.data.time = 0;
    this.data.hasStarted = true;
    this.data.currentLevel = 1;
    this.startTimer();

    document.querySelector("#intro-modal").setAttribute('visible', false);
    document.querySelector("#cursor").setAttribute('visible', false);
  },
  startTimer: function() {
    var that = this;
    //Using the date/time is the only thing I could think to use as a timer
    // Gets the initial time
    var initialTime = new Date().getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {
      // // Time calculations for minutes and seconds
      that.data.time++;
      var minutes = Math.floor(that.data.time / 60);
      var seconds = Math.floor(that.data.time % 60);

      // Display the result in the element with id="demo"
      document.getElementById("time").setAttribute('text', 'value: ' + minutes + "m " + seconds + "s ;");
    }, 1000);

    //End of Timer Script
  }
});
