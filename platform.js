var simpleLevelPlan = [
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x               v                        x",
  "x               v                        x",
  "x                                        x",
  "x                                        x",
  "x@                 xx   xxx  x     xx    x",
  "x                 x  x   x   x    x  x   x",
  "x                 xxxx   x   x    xxxx   x",
  "xxxxx   xx   xxx  x  x  xxx  xxx  x  x   x",
  "x x    x  x   x                          x",
  "x x    xxxx   x                          x",
  "x x    x  x  xxx                         x",
  "x                                        x",
  "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
];

function Level(simpleLevelPlan) {
  this.width = simpleLevelPlan[0].length;
  this.height = simpleLevelPlan.length;
  this.grid = [];
  this.actors = [];

  for (var y=0; y<this.height; y++) {
    var line = simpleLevelPlan[y], gridline = [];
    for (var x = 0; x < this.width; x++){
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava;"
    }
    this.grid.push(gridline);
  }
  this.player = this.actors.filter(function(actor){
    return actor.type == "player";
  })[0];
  this.staus = this.finishDelay = null;
}
