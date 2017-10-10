var symbol;
var stream;
var streams;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  streams = [];
  for (var i = 0; i < 120; i++) {
    stream = new Stream(random(40, width - 40), random(-20, 300), random(0, 15));
    stream.generateCharacters();
    streams.push(stream);
  }

}

function draw() {
  background(0);
  for(var i = 0; i < streams.length; i++) {
    if(streams[i].y >= height + 40) {
      streams.splice(i, 1);
      var tempStream = new Stream(random(40, width - 40), random(40, height-100), random(4, 15));
      tempStream.generateCharacters();
      streams.push(tempStream);
    } else {
      streams[i].renderCharacters();
      streams[i].goDown();
    }
  }
}

function Symbol(x, y) {
  this.x = x;
  this.y = y;
  this.symbol;
  this.generateSymbol = function() {
    this.symbol = String.fromCharCode(
      0x30A0 + round(random(0, 96))
    );
  }
  this.render = function() {
    fill(0, 255, 70);
    var tempNum = random(1, 15);
    if (tempNum > 10) {
      this.generateSymbol();
    }
    text(this.symbol, this.x, this.y);
  }
  this.getSymbol = function() {
    return this.symbol;
  }
  this.goDown = function() {
    this.y ++;
  }
}

function Stream(x, y, characterNum) {
  this.x = x;
  this.y = y;
  this.characterNum = characterNum;
  this.characters;
  this.generateCharacters = function() {
    this.characters = [];
    for (var i = 0; i < this.characterNum; i++) {
      var symb = new Symbol(this.x, this.y + ((i+1) * 20));
      symb.generateSymbol();
      this.characters.push(symb);
    }
  }
  this.renderCharacters = function() {
    for (var i = 0; i < this.characters.length; i++) {
      this.characters[i].render();
    }
  }
  this.goDown = function() {
    for (var i = 0; i < this.characters.length; i++) {
      this.y += 1;
      this.characters[i].goDown();
    }
  }
}
