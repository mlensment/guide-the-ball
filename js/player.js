var Player = function(params) {
  console.log('new player')
  Ball.call(this, params);
  this.bindListeners();
};

Player.prototype = Object.create(Ball.prototype);

Player.prototype.bindListeners = function() {
  window.addEventListener('deviceorientation', function(event) {
    this.tiltDebug.x = event.gamma || 0;
    this.tiltDebug.y = event.beta || 0;

    this.velocity.x = event.gamma;
    this.velocity.y = event.beta;
  }.bind(this), false);

  $(document).keydown(function(e) {
    switch(e.which){
      case 38:
        // up
        this.acceleration.x = 0;
        this.acceleration.y = -2;
      break;
      case 40:
        // down
        this.acceleration.x = 0;
        this.acceleration.y = 2;
      break;
      case 37:
        // left
        this.acceleration.x = -2;
        this.acceleration.y = 0;
      break;
      case 39:
        // right
        this.acceleration.x = 2;
        this.acceleration.y = 0;
      break;
    }
    return false;
  }.bind(this));

  $(document).keyup(function(e){
    this.acceleration.x = 0;
    this.acceleration.y = 0;
    this.velocity.x = 0;
    this.velocity.y = 0;
  }.bind(this));
  
};
