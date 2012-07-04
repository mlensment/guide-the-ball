var Ball = function() {
  this.radius = 5;
  this.position = new Vector(100, 100);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 4;
  this.slowingFactor = 0.5;

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.acceleration.x = Math.round(event.gamma) * this.slowingFactor;
    self.acceleration.y = Math.round(event.beta) * this.slowingFactor;
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
  this.debug();
  this.acceleration.zero();
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
  $('#debug').html('Acceleration vector: (' + this.acceleration.x + ', ' + this.acceleration.y + ')<br/>\
    Velocity vector: (' + this.velocity.x + ', ' + this.velocity.y + ')');
};