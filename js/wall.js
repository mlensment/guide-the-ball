var Wall = function(canvas) {
  this.canvas = canvas;
  this.pieceSize = 13; //TODO: calculate this based on canvas size
  this.tiles = this.calculateTiles();
  this.map = this.generateMap();
  this.grid = this.generateGrid(canvas);
};

Wall.prototype.calculateTiles = function() {
  return { 
    'x': Math.round(this.canvas.width / this.pieceSize),
    'y': Math.round(this.canvas.height / this.pieceSize)
  };
}

Wall.prototype.generateGrid = function(canvas) {
  var xRectWidth = canvas.width / 100,
      yRectWidth = canvas.height / 300;
  return [canvas.width / 100;
};

Wall.prototype.generateMap = function() {
  var newPart = [];
  for(var i = 0; i < this.tiles['x']; i++) {
    newPart.push(Math.rand())
  }
};