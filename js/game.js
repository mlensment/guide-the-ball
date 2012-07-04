$(document).ready(function() {
  game = new Game();
});

var Game = function() {
  this.canvas = document.getElementById('guide-the-ball');
  this.ctx = this.canvas.getContext('2d');
  this.ball = new Ball(this.canvas);
  var self = this;
  this.running = setInterval(function(){self.tick()}, 100);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  this.ball.update();
};

Game.prototype.draw = function() {
  this.canvas.width = this.canvas.width;
  this.ball.draw(this.ctx);
};