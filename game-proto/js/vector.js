var Vector = function(x, y) {
  this.x = x;
  this.y = y

  this.isub = function(other) {
    this.x -= other.x;
    this.y -= other.y;
  }

  this.iadd = function(other) {
    this.x += other.x;
    this.y += other.y;
  }
  
  this.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  this.idiv = function(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  this.zero = function() {
    this.x = 0;
    this.y = 0;
  }
};