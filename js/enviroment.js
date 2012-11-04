var Enviroment = function(canvas) {
  this.balls = [];
};

Enviroment.prototype.generateBalls = function(quantity) {
  quantity = quantity || 1;
  for(var i = 0; i < quantity; i++) {
    var ball = new Ball();
    ball.position = '';
    this.balls.unshift(ball);
  }
};