$(document).ready(function() {
  game = new Game();
});

var Game = function() {
  $('body').prepend('<canvas id="guide-the-ball" width="' + window.innerWidth + '" height="' + window.innerHeight + '"></canvas>');
  $('#debug').append(window.innerWidth +' x '+ window.innerHeight)
  this.canvas = document.getElementById('guide-the-ball');
  this.ctx = this.canvas.getContext('2d');
  this.ball = new Ball(this.canvas);
  this.ground = new Ground(this.canvas);
  var self = this;
  this.running = setInterval(function(){self.tick()}, 50);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  this.ground.update();
  this.ball.update();
  this.ball.detectCollision(this.ground);
};

Game.prototype.draw = function() {
  this.ground.draw(this.ctx);
  this.ctx.fillStyle = 'rgb(255, 0, 0)';
  this.ball.draw(this.ctx);
};

//Configuration for 800x
var config = {
  //
};