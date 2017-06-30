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
    endModalTimerStart: {
      type: "number",
      default: 5
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
    var scene = document.querySelector('a-scene');
    var self = this;

    //some components and systems may be listening for these events
    this.data.level++;
    scene.emit('gamelevelincrease', {level: this.data.level});

    console.log('incrementing level to level ' + this.data.level);
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
    var scene = document.querySelector('a-scene');
    scene.emit('gamestart');

    this.startTimer();
    this.data.hasStarted = true;

    document.querySelector("#intro-modal").setAttribute('visible', false);
    document.querySelector("#cursor").setAttribute('visible', false);
  },
  endGame: function() {
    var self = this;
    var scene = document.querySelector('a-scene');
    scene.emit('gameend');

    var timeRemaining = self.data.endModalTimerStart;
    var countdownEl = document.querySelector('#countdown');

    var intervalId = setInterval(function() {
      timeRemaining--;

      scene.emit('gameendtimerchange', { timeRemaining: timeRemaining });

      if(timeRemaining == 0) {
        clearInterval(intervalId);
        self.resetGame();
        self.startGame();
      }
    }, 1000);

    this.data.hasStarted = false;
  },
  resetGame: function(){
    var scene = document.querySelector('a-scene');
    scene.emit('gamereset');

    this.data.score = 0;
    this.data.time = 0;
    this.data.level = 0;
    this.data.distance = 0;
  },
  startTimer: function() {
    var self = this;

    self.timerIntervalId = setInterval(function() {
      self.data.time++;
      // var minutes = Math.floor(that.data.time / 60);
      // var seconds = Math.floor(that.data.time % 60);

      // Display the result in the element with id="demo"
      // that.updateTimer(minutes, seconds);
    }, 1000);
  }
});
