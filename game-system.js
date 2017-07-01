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
          end: 12,
          sharkSpeed: 1.5
        },
        {
          end: 24,
          sharkSpeed: 1.75
        },
        {
          end: 36,
          sharkSpeed: 2.00
        },
        {
          end: 48,
          sharkSpeed: 2.5
        },
        {
          end: 60,
          sharkSpeed: 3
        },
        {
          end: 72,
          sharkSpeed: 3.5
        },
        {
          end: 84,
          sharkSpeed: 4.0
        },
        {
          end: 96,
          sharkSpeed: 4.5
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

    if(typeof this.data.levelSettings[this.data.level + 1] != 'undefined'
      && this.data.time > this.data.levelSettings[this.data.level].end) {
      this.incrementLevel();
    }
  },
  incrementLevel: function() {
    var scene = document.querySelector('a-scene');
    var self = this;

    this.data.level++;

    //some components and systems may be listening for these events
    scene.emit('gamelevelincrease', {level: this.data.level});

    console.log('incrementing level to level ' + this.data.level);
  },
  updateDistance: function() {
    this.data.distance = this.data.distance + this.data.levelSettings[this.data.level].sharkSpeed;
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
