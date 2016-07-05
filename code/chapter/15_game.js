var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];

function Level(plan) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.actors = [];

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function() {
  return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava
};

function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

var simpleLevel = new Level(simpleLevelPlan);

function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";
  for (var y = yStart; y < yEnd; y++) {
    for (var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if (fieldType) return fieldType;
    }
  }
};

Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;

Level.prototype.animate = function(step, keys) {
  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

var wobbleSpeed = 8, wobbleDist = 0.07;

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

var gravity = 30;
var jumpSpeed = 17;

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if (obstacle) {
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
    var audio = new Audio('squeal.mp3');
    audio.play();
    <audio controls src="data:audio/ogg;base64,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" />
    this.pos.y += step;
    this.size.y -= step;
  }
};

Level.prototype.playerTouched = function(type, actor) {
  if (type == "lava" && this.status == null) {
    this.status = "lost";
    this.finishDelay = 1;
  } else if (type == "coin") {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "coin";
    })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  }
};

var arrowCodes = {37: "left", 38: "up", 39: "right"};

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n]), Display, function(status) {
      if (status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}
