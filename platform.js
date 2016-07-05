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

  for var y=0; y
}
