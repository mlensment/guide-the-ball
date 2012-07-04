var Ball = function() {
  this.width = 10;
  this.height = 10;
  this.position = [0, 0];
  this.orientation = { 'alpha': 0, 'beta': 0, 'gamma': 0 };

  window.addEventListener('deviceorientation', function(event) {
    this.orientation['alpha'] = event.alpha;
    this.orientation['beta'] = event.beta;
    this.orientation['gamma'] = event.gamma;
  }, false);
};

Ball.prototype.update = function() {
  for(var key in this.orientation) {
    console.log(this.orientation[key] + ' ');
  }
};

Ball.prototype.draw = function() {

};