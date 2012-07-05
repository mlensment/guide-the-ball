var Wall = function(canvas) {
  this.canvas = canvas;
  this.speed = 1; //pixels per tick
  this.tileSize = 20; //TODO: calculate this based on canvas size
  this.gapSize = 10;
  this.gapOffsetLimit = 3;
  this.tiles = this.calculateTiles();
  this.map = this.generateBlankMap();
  this.shiftMapRow();
};

Wall.prototype.calculateTiles = function() {
  return { 
    'x': Math.round(this.canvas.width / this.tileSize),
    'y': Math.round(this.canvas.height / this.tileSize)
  };
}

Wall.prototype.update = function() {
  this.shiftMapRow();
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

Wall.prototype.shiftMapRow = function() {
  this.map.pop();
  this.map.unshift(this.generateMapRow());
};

Wall.prototype.generateMapRow = function() {
  var start = this.calculateGapStart();
  var newPart = [];
  for(var i = 0; i <= this.tiles['x']; i++) {
    if(i == start) {
      for(var j = 0; j <= this.gapSize; j++, i++) {
        newPart.push(0);
      }
    } else {
      newPart.push(1);
    }
  }
  return newPart;
};

Wall.prototype.calculateGapStart = function() {
  var gapFrom = 0;
  var gapTo = this.tiles['x'];
  if(!this.firstMapRowBlank()) {
    for(var i in this.map[0]) {
      if(this.map[0][i] == 0) {
        gapFrom = +i - this.gapOffsetLimit;
        gapFrom = (gapFrom < 0) ? 0 : gapFrom;
        gapTo = +i + this.gapOffsetLimit;
        gapTo = (gapTo > this.tiles['x']) ? this.tiles['x'] : gapTo;
        break;
      }
    }
  }

  return Math.floor(Math.random() * (gapTo - gapFrom + 1) + gapFrom);
};

Wall.prototype.firstMapRowBlank = function() {
  for(var i in this.map[0]) {
    if(this.map[0][i] != 0)
      return false;
  }
  return true;
};

Wall.prototype.draw = function(ctx) {
  for(var i in this.map) {
    for(var j in this.map[i]) {
      if(this.map[i][j] == 1) {
        ctx.fillStyle = 'rgb(0, 0, 0)';
      } else {
        ctx.fillStyle = 'rgb(255, 255, 255)';
      }

      var positionX = j * this.tileSize,
          positionY = i * this.tileSize;
       ctx.fillRect(positionX, positionY, this.tileSize, this.tileSize);
    }
  }
};