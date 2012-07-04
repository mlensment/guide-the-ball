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
  this.debug();
};

Ball.prototype.draw = function() {

};

Ball.prototype.debug = function() {
  $('#debug').html('Alpha: ' + this.orientation['alpha'] + '<br>\
    Beta: ' + this.orientation['beta'] + '<br>\
    Gamma: ' + this.orientation['gamma']);
};