var Ball = function(canvas) {
  this.radius = 13;
  this.position = new Vector(canvas.width / 2, canvas.height / 2);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 15;
  this.accelerationLimit = 2;
  this.tiltLimit = 18;
  this.slowingFactor = 20;
  this.tiltDebug = {'x' : 0, 'y': 0};

  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.tiltDebug['x'] = event.gamma;
    self.tiltDebug['y'] = event.beta;
    
    if(Math.abs(event.gamma) > self.tiltLimit || Math.abs(event.gamma / self.slowingFactor) > self.accelerationLimit) {
      self.acceleration.x = (event.gamma < 0) ? self.accelerationLimit * -1 : self.accelerationLimit;
    } else {
      self.acceleration.x = event.gamma / self.slowingFactor;
    }

    if(Math.abs(event.beta) > self.tiltLimit || Math.abs(event.beta / self.slowingFactor) > self.accelerationLimit) {
      self.acceleration.y = (event.beta < 0) ? self.accelerationLimit * -1 : self.accelerationLimit;
    } else {
      self.acceleration.y = event.beta / self.slowingFactor;
    }

  }, false);
};

Ball.prototype.update = function() {
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
  $('#debug').html('Acceleration vector: (' + this.acceleration.x.toFixed(2) + ', ' + this.acceleration.y.toFixed(2) + ')<br/>\
    Velocity vector: (' + Math.round(this.velocity.x) + ', ' + Math.round(this.velocity.y) + ')<br/>\
    Tilt: (' + this.tiltDebug['x'].toFixed(2) + ', ' + this.tiltDebug['y'].toFixed(2) + ')');
};