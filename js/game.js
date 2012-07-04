$(document).ready(function() {
  var game = new Game();
});

var Game = function() {
  this.ball = new Ball();
  var self = this;
  this.running = setInterval(function(){self.tick()}, 50);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  this.ball.update();
};

Game.prototype.draw = function() {
  this.ball.draw();
};