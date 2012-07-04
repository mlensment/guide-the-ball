var Ball = function(canvas) {
  this.radius = 5;
  this.position = new Vector(canvas.width / 2, canvas.height / 2);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 10;
  this.slowingFactor = 70;

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.acceleration.x = event.gamma / self.slowingFactor;
    self.acceleration.y = event.beta / self.slowingFactor;
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
  $('#debug').html('Acceleration vector: (' + Math.round(this.acceleration.x) + ', ' + Math.round(this.acceleration.y) + ')<br/>\
    Velocity vector: (' + Math.round(this.velocity.x) + ', ' + Math.round(this.velocity.y) + ')');
};