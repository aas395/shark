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
    level: {
      type : "number",
      default : 0
    },
    levelSettings: {
      type: 'array',
      default: [
        {
          end: 750,
          sharkSpeed: 1
        },
        {
          end: 1125,
          sharkSpeed: 1.5
        },
        {
          end: 1687.5,
          sharkSpeed: 2.25
        },
        {
          end: 2531.25,
          sharkSpeed: 2.25
        },
        {
          end: 3796.5,
          sharkSpeed: 3.25
        },
        {
          end: 5694,
          sharkSpeed: 4.25
        },
        {
          end: 8541,
          sharkSpeed: 6.25
        },
        {
          end: 12811.5,
          sharkSpeed: 9.5
        }
      ]
    }
  },  // System schema. Parses into `this.data`.
  init: function () {
    this.timerIntervalId;

    var scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function() {
      setTimeout(function() {
        document.querySelector('a-scene').systems['shark'].initObstacles();  
      }, 0);
    });

    // this.el.appendChild('<a-entity physics-body="static-body" mixin="build" geometry="depth: 150; width: 150; height: 140;" position="110 69 1500" material="src: url(https://cdn.glitch.com/b870d9ec-1139-44f9-b462-223e4a2c74e7%2Ftexture.jpg?1490308149272)"></a-entity>')
  },
  tick: function() {
    if(this.data.hasStarted) {
      this.updateDistance();
      this.updateScore();
    }

    if(typeof this.data.levelSettings[this.data.level] != 'undefined' 
      && this.data.distance > this.data.levelSettings[this.data.level].end) {
      this.incrementLevel();
    }
  },
  incrementLevel: function() {
    this.data.level++;
    console.log('incrementing level to level ' + this.data.level);
    document.querySelector('a-scene').systems['shark'].updateSharkSpeed();
  },
  setDistance: function(distance) {
    this.data.distance = distance;
  },
  updateDistance: function() {
    // @TODO maybe add compounding with increased speed
    this.setDistance(this.data.distance + 1 + (this.data.level * .5));
  },
  updateScore: function() {
    this.data.score = this.data.distance;
  },
  startGame: function() {
    this.resetGame();
    this.startTimer();
    this.data.hasStarted = true;

    document.querySelector('a-scene').systems['shark'].updateSharkSpeed();

    document.querySelector("#intro-modal").setAttribute('visible', false);
    document.querySelector("#cursor").setAttribute('visible', false);
  },
  endGame: function() {
    var that = this;

    document.querySelector('a-scene').systems['shark'].updateSharkSpeed(0);

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
    this.data.level = 0;
    this.data.distance = 0;

    document.querySelector('a-scene').systems['shark'].resetObstaclePositions();

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
