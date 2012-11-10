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
}
