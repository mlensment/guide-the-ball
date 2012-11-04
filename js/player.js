var Player = function(canvas) {
  console.log('new player')
  Ball.prototype.constructor.call(this, canvas);
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

var proxy = function () {};
proxy.prototype = Ball.prototype;
Player.prototype = new proxy();
Player.prototype.constructor = Player;