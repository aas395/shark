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
    }
  },  // System schema. Parses into `this.data`.
  init: function () {
    this.timerIntervalId;
    // this.el.appendChild('<a-entity physics-body="static-body" mixin="build" geometry="depth: 150; width: 150; height: 140;" position="110 69 1500" material="src: url(https://cdn.glitch.com/b870d9ec-1139-44f9-b462-223e4a2c74e7%2Ftexture.jpg?1490308149272)"></a-entity>')
  },
  tick: function() {
    if(this.data.hasStarted) {
      this.updateScore();
    }
  },
  setDistance: function(distance) {
    this.data.distance = -distance;
  },
  updateScore: function() {
    this.data.score = this.data.distance;
  },
  setHasStarted: function(hasStarted) {
    this.data.hasStarted = hasStarted;
  },
  startGame: function() {
    this.resetGame();
    this.startTimer();
    this.data.hasStarted = true;

    var sharks = document.querySelectorAll('a-entity[shark]');
    console.log(sharks);
    for(var i = 0; i < sharks.length; i++) {
      sharks[i].components['shark'].updateSpeed(1); //starts shark movement
    }

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

    clearInterval(this.timerIntervalId);

    var timeRemaining = 5;

    var intervalId = setInterval(function(){
      if(timeRemaining == 1) {
        document.querySelector('#countdown').setAttribute('text', {align: "center",  value: "5"  });
        clearInterval(intervalId);
        that.resetGame();
        that.startGame();
        return;
      }

      timeRemaining--;
      document.querySelector('#countdown').setAttribute('text', {align: "center",  value: "" + timeRemaining });
    }, 1000);
  },
  resetGame: function(){
    var playerPosition = document.querySelector("#character").getAttribute('position');
    document.querySelector("#character").setAttribute('position', {x:0,  y:0, z: playerPosition.z});

    this.data.score = 0;
    this.data.time = 0;
    this.data.currentLevel = 1;
    this.data.forwardMotionCoefficient = 2;

    var endModal = document.querySelector("#end-modal");
    endModal.setAttribute('visible', false);
  },
  startTimer: function() {
    var self = this;
    //Using the date/time is the only thing I could think to use as a timer

    // Update the count down every 1 second
    self.timerIntervalId = setInterval(function() {
      self.data.time++;
      // var minutes = Math.floor(that.data.time / 60);
      // var seconds = Math.floor(that.data.time % 60);

      // Display the result in the element with id="demo"
      // that.updateTimer(minutes, seconds);
    }, 1000);
  }
});
