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
  //this.wall.update();
  this.ball.update();
};

Game.prototype.draw = function() {
  //this.wall.draw(this.ctx);
  this.ctx.globalCompositeOperation = 'source-in';
  this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalCompositeOperation = 'lighter';
  this.ball.draw(this.ctx);
};