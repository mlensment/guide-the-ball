var Ball = function(canvas) {
  console.log('new ball')
  this.radius = 25;
  this.position = new Vector(canvas.width / 2, canvas.height / 2);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);
  this.speedLimit = 25;
  this.accelerationLimit = 20;
  this.tiltLimit = 18;
  this.tiltDebug = {x : 0, y: 0};
  this.radiusDelta = -0.1;
  this.collision = false;
};

Ball.prototype.detectCollision = function(wall) {
  var x = {
            'max': Math.floor((this.position.x + this.radius) / wall.tileSize), 
            'min': Math.floor((this.position.x - this.radius) / wall.tileSize)
          },
      y = {
            'max': Math.floor((this.position.y + this.radius - wall.offset) / wall.tileSize), 
            'min': Math.floor((this.position.y - this.radius - wall.offset) / wall.tileSize)
          };
          
  if(wall.map[y['max']][x['max']] == barrierTile || wall.map[y['max']][x['min']] == barrierTile || wall.map[y['min']][x['max']] == barrierTile || wall.map[y['min']][x['min']] == barrierTile) {
    this.collision = true;
  } else {
    this.collision = false;
  }
};

Ball.prototype.changeRadius = function() {
  if(this.radius > 0) {
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
    Tilt: (' + this.tiltDebug['x'].toFixed(2) + ', ' + this.tiltDebug['y'].toFixed(2) + ')');
};

