var Ball = function() {
  this.radius = 2.5;
  this.position = new Vector(100, 100);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 4;
  this.orientation = { 'alpha': 0, 'beta': 0, 'gamma': 0 };

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.orientation['alpha'] = Math.round(event.alpha);
    self.orientation['beta'] = Math.round(event.beta);
    self.orientation['gamma'] = Math.round(event.gamma);
    self.acceleration.x = Math.round(event.beta) / 100;
    self.acceleration.y = Math.round(event.gamma) / 100;
  }, false);
};

Ball.prototype.update = function() {
  this.acceleration.validate();
  this.velocity.iadd(this.acceleration);

  var speed = this.velocity.length();
  if(speed > this.speedLimit) {
    this.velocity.idiv(speed / this.speedLimit);
  }
  this.position.iadd(this.velocity);
  this.acceleration.zero();
  this.debug();
};

Ball.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(
      this.position.x, this.position.y,
      this.radius, 0, Math.PI * 2, false
  );
  ctx.fill();
};

Ball.prototype.debug = function() {
  $('#debug').html('Alpha: ' + this.orientation['alpha'] + '<br>\
    Beta: ' + this.orientation['beta'] + '<br>\
    Gamma: ' + this.orientation['gamma']);
};