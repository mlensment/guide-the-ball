$(document).ready(function() {
  Game = new Game();
});

var Game = function() {
  this.setupCanvas();

  this.player = new Player({
    position: new Vector(this.canvas.width / 2, this.canvas.height / 2)
  });

  this.environment = new Environment();

  var self = this;
  this.running = setInterval(function(){self.tick()}, 15);
};

Game.prototype.tick = function() {
  this.update();
  this.draw();
};

Game.prototype.update = function() {
  this.player.update();
  this.environment.update();
};

Game.prototype.render = function(drawFunction) {
  
  drawFunction(buffer.getContext('2d'));
};

Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.player.draw(this.ctx);
  this.environment.draw(this.ctx);
};

//Configuration for 800x
var config = {
  //
};

Game.prototype.setupCanvas = function() {
  $('body').prepend('<canvas id="guide-the-ball" width="' + window.innerWidth + '" height="' + window.innerHeight + '"></canvas>');
  $('#debug').append(window.innerWidth +' x '+ window.innerHeight)
  this.canvas = document.getElementById('guide-the-ball');
  this.ctx = this.canvas.getContext('2d');
};