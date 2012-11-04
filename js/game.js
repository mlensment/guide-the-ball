$(document).ready(function() {
  game = new Game();
});

var Game = function() {
  $('body').prepend('<canvas id="guide-the-ball" width="' + window.innerWidth + '" height="' + window.innerHeight + '"></canvas>');
  $('#debug').append(window.innerWidth +' x '+ window.innerHeight)
  this.canvas = document.getElementById('guide-the-ball');
  this.ctx = this.canvas.getContext('2d');
  this.player = new Player(this.canvas);
  this.ground = new Ground(this.canvas);
  var self = this;
  this.running = setInterval(function(){self.tick()}, 30);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  this.player.update();
  this.player.detectCollision(this.ground);
};

Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.fillStyle = 'rgb(255, 0, 0)';
  this.player.draw(this.ctx);
};

//Configuration for 800x
var config = {
  //
};