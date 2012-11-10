var Environment = function(quantity) {
  this.balls = [];
  this.walls = [];

  this.generateBalls(quantity);
};

Environment.prototype.generateBalls = function(quantity) {
  quantity = quantity || 1;
  for(var i = 0; i < quantity; i++) {
    var ball = new Ball({
      position: new Vector(100, 100)
    });

    this.balls.unshift(ball);
  }
};

Environment.prototype.update = function() {
  for(var i = 0; i < this.balls.length; i++) {
    this.balls[i].update();
  }
};

Environment.prototype.draw = function(ctx) {
  for(var i = 0; i < this.balls.length; i++) {
    this.balls[i].draw(ctx);
  }
};