AFRAME.registerSystem('game', {
  schema: {
    debug: {
      type: "boolean",
      default: false
    },
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
    level: {
      type : "number",
      default : 0
    },
    timerIntervalId: {
      type: "number",
      default: 0
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
    this.resetGame();
    this.data.forwardMotionCoefficient = 2;

    this.startTimer();
    this.data.hasStarted = true;

    document.querySelector("#intro-modal").setAttribute('visible', false);
    document.querySelector("#cursor").setAttribute('visible', false);
  },
  endGame: function() {
    var that = this;

    this.data.forwardMotionCoefficient = 0;
    this.data.hasStarted = false;

    var endModal = document.querySelector("#end-modal");
    var endDistance = this.data.distance;

    endModal.setAttribute('visible', true);

    clearInterval(this.data.timerIntervalId);

    var timeRemaining = 5;

    var intervalId = setInterval(function(){
      if(timeRemaining == 0) {
        document.querySelector('#countdown').setAttribute('text', {align: "center",  value: "5"  });
        clearInterval(intervalId);
        return;
      }

      timeRemaining--;
      document.querySelector('#countdown').setAttribute('text', {align: "center",  value: "" + timeRemaining });
      },1000);

    setTimeout(function() {
      that.resetGame();
      that.startGame();
    }, 5000);
  },
  resetGame: function(){
    document.querySelector("#character").setAttribute('position', {x:0,  y:0, z: 0 });

    this.data.score = 0;
    this.data.time = 0;
    this.data.currentLevel = 1;

    // this.updateTimer(0,0);

    var endModal = document.querySelector("#end-modal");
    endModal.setAttribute('visible', false);
  },
  updateTimer: function(minutes, seconds) {
    // document.getElementById("time").setAttribute('text', 'value: ' + minutes + "m " + seconds + "s ;");
  },
  startTimer: function() {
    var that = this;
    //Using the date/time is the only thing I could think to use as a timer
    // Gets the initial time
    var initialTime = new Date().getTime();

    // Update the count down every 1 second
    this.data.timerIntervalId = setInterval(function() {
      // // Time calculations for minutes and seconds
      that.data.time++;
      var minutes = Math.floor(that.data.time / 60);
      var seconds = Math.floor(that.data.time % 60);

      // Display the result in the element with id="demo"
      // that.updateTimer(minutes, seconds);
    }, 1000);

    //End of Timer Script
  }
});
