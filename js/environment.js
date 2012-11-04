var Environment = function(canvas) {
  this.balls = [];
};

Environment.prototype.generateBalls = function(quantity) {
  quantity = quantity || 1;
  for(var i = 0; i < quantity; i++) {
    var ball = new Ball();
    ball.position = '';
    this.balls.unshift(ball);
  }
};