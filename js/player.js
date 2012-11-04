var Player = function(canvas) {
  console.log('new player')
  Ball.call(this, canvas);
  this.bindListeners();
};

Player.prototype.bindListeners = function() {
  window.addEventListener('deviceorientation', function(event) {
    this.tiltDebug.x = event.gamma;
    this.tiltDebug.y = event.beta;

    this.velocity.x = event.gamma;
    this.velocity.y = event.beta;
  }.bind(this), false);
}

Player.prototype = Object.create(Ball.prototype);