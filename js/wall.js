var Wall = function(canvas) {
  this.canvas = canvas;
  this.speed = 1; //pixels per tick
  this.pieceSize = 20; //TODO: calculate this based on canvas size
  this.gapTiles = 20;
  this.tiles = this.calculateTiles();
  this.map = this.generateBlankMap();
  this.shiftMapRow(true);
  this.grid = this.generateGrid(canvas);
};

Wall.prototype.calculateTiles = function() {
  return { 
    'x': Math.round(this.canvas.width / this.pieceSize),
    'y': Math.round(this.canvas.height / this.pieceSize)
  };
}

Wall.prototype.generateGrid = function(canvas) {

};

Wall.prototype.generateBlankMap = function() {
  var map = []
  for(var i = 0; i <= this.tiles['x']; i++) {
    var mapRow = []
    for(var j = 0; j <= this.tiles['y']; j++) {
      mapRow.push(0);
    }
    map.unshift(mapRow);
  }
  return map;
};

Wall.prototype.shiftMapRow = function(useWholeRow) {
  this.map.pop();
  this.map.unshift(this.generateMapRow(useWholeRow));
};

Wall.prototype.generateMapRow = function(useWholeRow) {
  var useWholeRow = useWholeRow || false;
  var gapFrom = 0;
  var gapTo = this.tiles['x'];
  if(!useWholeRow) {
    for(var i in this.map[0]) {
      if(this.map[0][i] == 0) {
        gapFrom = (+i - this.gapTiles < 0) ? 0 : +i - this.gapTiles;
        gapTo = +i + this.gapTiles;
        break;
      }
    }
  }

  var start = Math.floor(Math.random() * (gapTo - gapFrom + 1) + gapFrom);
  console.log('gf ' + gapFrom + ' gt ' + gapTo)
  console.log('start ' + start)
  var newPart = [];
  for(var i = 0; i <= this.tiles['x']; i++) {
    if(i == start) {
      for(var j = 0; j <= this.gapTiles; j++, i++) {
        newPart.push(0);
      }
    } else {
      newPart.push(1);
    }
  }
  return newPart;
};

Wall.prototype.draw = function(ctx) {
  for(var i in this.map) {
    for(var j in this.map[i]) {
      if(this.map[i][j] == 1) {
        ctx.fillStyle = 'rgb(0, 0, 0)';
      } else {
        ctx.fillStyle = 'rgb(255, 255, 255)';
      }

      var positionX = j * this.pieceSize,
          positionY = i * this.pieceSize;
       ctx.fillRect(positionX, positionY, this.pieceSize, this.pieceSize);
    }
  }
};