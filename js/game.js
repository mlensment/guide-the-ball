$(document).ready(function() {
  game = new Game();
});

var Game = function() {
  $('body').prepend('<canvas id="guide-the-ball" width="' + (window.innerWidth - 12)+ '" height="' + (window.innerHeight - 12) + '"></canvas>');
  this.canvas = document.getElementById('guide-the-ball');
  this.ctx = this.canvas.getContext('2d');
  this.ball = new Ball(this.canvas);
  this.wall = new Wall(this.canvas);
  var self = this;
  this.running = setInterval(function(){self.tick()}, 50);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  
  this.wall.update();
  this.ball.update();
  this.ball.checkCollision(this.wall);
};

Game.prototype.draw = function() {
  this.wall.draw(this.ctx);
  this.ctx.fillStyle = 'rgb(255, 0, 0)';
  this.ball.draw(this.ctx);
};