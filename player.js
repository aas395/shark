AFRAME.registerComponent("player", {
  schema: {
    playerCanMove: {
      type: 'boolean',
      default: false
    }
  },
  init: function() {
    var self = this;
    this.XYmultiplier = 2;
    var Game = this.el.sceneEl.systems['game'];

    self.el.sceneEl.addEventListener('gamereset', function() {
        var playerPosition = self.el.getAttribute('position');
        self.el.setAttribute('position', {x:0,  y:0, z: playerPosition.z});
    });

    self.el.sceneEl.addEventListener('gamestart', function() {
        self.data.playerCanMove = true;
        self.el.components.sound.playSound();
    });

    self.el.sceneEl.addEventListener('gameend', function() {
        self.data.playerCanMove = false;
        // console.log('game ended')
    });

    self.el.sceneEl.addEventListener('collide', function(e) {
      if(self.data.playerCanMove && e.target.hasAttribute('tunnel-wall')) {
        self.handleWallCollision();
      }
    });

    self.el.sceneEl.addEventListener('gamelevelincrease', function() {
      if(typeof Game.data.levelSettings[Game.data.level].audioFile != 'undefined') {
        var audioFile = Game.data.levelSettings[Game.data.level].audioFile;
        // console.log('updating audio file to ' + audioFile);
        character.components.sound.stopSound();
        character.setAttribute('sound', {
          src: audioFile,
          loop: true,
          autoPlay: true
        });
        character.components.sound.playSound();
      }
    });
  },
  tick : function() {
      if(this.data.playerCanMove) {
        var playerPosition = this.el.getAttribute('position');
        var direction = this.el.components.camera.camera.getWorldDirection();

        var currentPosition = {
          x: playerPosition.x + (direction.x * this.XYmultiplier),
          y: playerPosition.y + (direction.y * this.XYmultiplier),
          z: playerPosition.z
        };

        this.el.setAttribute('position', currentPosition);
      }
  },
  handleWallCollision: function() {
    var Game = document.querySelector('a-scene').systems['game'];
    var self = this;
    var player = this.el;
    var playerPosition = player.getAttribute('position');
    var xPosition = playerPosition.x;
    var yPosition = playerPosition.y;
    var zPosition = playerPosition.z;
    // console.log('responding to collision')
    if(this.data.playerCanMove) {
      var direction = this.el.components.camera.camera.getWorldDirection();

      var xDirectionAdjustmentSign = xPosition * direction.x > 0 ? -1 : 1;
      var yDirectionAdjustmentSign = yPosition * direction.y > 0 ? -1 : 1;

      var xDirectionAdjustment = self.XYmultiplier * xDirectionAdjustmentSign * direction.x * 20;
      var yDirectionAdjustment = self.XYmultiplier * yDirectionAdjustmentSign * direction.y * 20;
    
      this.data.playerCanMove = false;

      self.el.setAttribute('position', {
        x: xPosition + xDirectionAdjustment,
        y: yPosition + yDirectionAdjustment,
        z: zPosition
      });

      setTimeout(function() {
        if(Game.data.hasStarted) {
          self.data.playerCanMove = true;  
        }
      }, 200);
    }
  }
});
