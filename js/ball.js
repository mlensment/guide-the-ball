var Ball = function(params) {
  console.log('new ball')
  this.radius = params.radius || 25;
  this.position = params.position;
  this.velocity = params.velocity || new Vector(0, 0);
  this.acceleration = params.acceleration || new Vector(0, 0);
  this.speedLimit = params.speedLimit || 25;
  this.accelerationLimit = params.accelerationLimit || 20;
  this.tiltLimit = params.tiltLimit || 18;
  this.tiltDebug = {x : 0, y: 0};
  this.radiusDelta = params.radiusDelta || 0;
  this.collision = false;
};

Ball.prototype.detectCollision = function(env) {
  for(var i = 0; i < env.balls.length; i++) {
    var envBall = env.balls[i];
    var distance = Vector.distance(this.position, envBall.position);
    distance = distance - this.radius - envBall.radius;
    if(distance <= 0) {
      this.collision = true;
    } else {
      this.collision = false;
    }
  }
};

Ball.prototype.changeRadius = function() {
  if(this.radius > 0.5) {
    this.radius = this.radius + this.radiusDelta;
  }
};

Ball.prototype.update = function() {
  var speed = this.velocity.length();
  if(speed > this.speedLimit) {
    this.velocity.idiv(speed / this.speedLimit);
  }
  this.position.iadd(this.velocity);  
  this.debug();

  this.changeRadius();
};

Ball.prototype.draw = function(ctx) {
  if(this.collision)
    ctx.fillStyle = 'rgb(0, 255, 0)';
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
    Tilt: (' + this.tiltDebug['x'].toFixed(2) + ', ' + this.tiltDebug['y'].toFixed(2) + ')<br/>');
};

