var Ball = function() {
  this.width = 10;
  this.height = 10;
  this.position = [0, 0];
  this.orientation = { 'alpha': 0, 'beta': 0, 'gamma': 0 };
  var self = this;
  window.addEventListener('deviceorientation', function(event) {
    self.orientation['alpha'] = event.alpha;
    self.orientation['beta'] = event.beta;
    self.orientation['gamma'] = event.gamma;
  }, false);
};

Ball.prototype.update = function() {
  //for debugging
  var c = document.getElementById('guide-the-ball');
  var ctx = c.getContext('2d');
  c.width = c.width;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '10px Calibri';
  ctx.fillText(this.orientation['alpha'], c.width / 2, (c.height / 2.3) + 20);
  ctx.fillText(this.orientation['beta'], c.width / 2, (c.height / 2.3) + 40);
  ctx.fillText(this.orientation['gamma'], c.width / 2, (c.height / 2.3) + 60);
};

Ball.prototype.draw = function() {

};