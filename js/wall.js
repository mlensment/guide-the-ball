var Wall = function(canvas) {
  this.canvas = canvas;
  this.scrollSpeed = 3;
  this.tileSize = 50; //TODO: calculate this based on canvas size
  this.offset = this.tileSize * -1;
  this.gapSize = 7;
  this.gapOffsetLimit = 3;

  this.tiles = this.calculateTiles();
  this.map = this.generateBlankMap();
  this.shiftMapRow();
};

Wall.prototype.calculateTiles = function() {
  return { 
    x: Math.round(this.canvas.width / this.tileSize),
    y: Math.round(this.canvas.height / this.tileSize)
  };
};

Wall.prototype.update = function() {
  if(this.offset >= 0) {
    this.shiftMapRow();
    this.offset = this.tileSize * -1;
  } else {
    this.offset += this.scrollSpeed;
  }
};

Wall.prototype.generateBlankMap = function() {
  var map = []
  for(var i = 0; i <= this.tiles.y; i++) {
    var mapRow = []
    for(var j = 0; j < this.tiles.x; j++) {
      mapRow.push(gapTile);
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
  for(var i = 0; i <= this.tiles.x; i++) {
    if(i == start) {
      for(var j = 0; j <= this.gapSize; j++, i++) {
        newPart.push(gapTile);
      }
    } else {
      newPart.push(barrierTile);
    }
  }
  return newPart;
};

Wall.prototype.calculateGapStart = function() {
  var gapFrom = 0;
  var gapTo = this.tiles.x - this.gapSize;
  this.currentGapSize = this.gapSize;
  if(!this.firstMapRowBlank()) {
    for(var i in this.map[0]) {
      if(this.map[0][i] == gapTile) {
        gapFrom = +i - this.gapOffsetLimit;
        gapFrom = (gapFrom < 0) ? 0 : gapFrom;
        gapTo = +i + this.gapOffsetLimit;
        gapTo = (gapTo > this.tiles.x - this.gapSize) ? this.tiles.x - this.gapSize : gapTo;
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
      var positionX = j * this.tileSize,
          positionY = i * this.tileSize + this.offset;

      if(this.map[i][j].hasOwnProperty('imgId')) {

        
        ctx.drawImage(document.getElementById(this.map[i][j].imgId), positionX, positionY, this.tileSize, this.tileSize)
      } else {
        ctx.fillStyle = this.map[i][j].fillStyle;
        ctx.fillRect(positionX, positionY, this.tileSize, this.tileSize);
      }
      // img.onload = function() {
      //   ctx.fillRect(positionX, positionY, self.tileSize, self.tileSize);
      // };
      
    }
  }
};