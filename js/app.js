// Enemies our player must avoid
var Enemy = function(enemyName, xPos, yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the X position of the Enemy
    // Since the enemies will start on the left, the X should be 0
    this.x = xPos;
    // Set the Y position of the enemy
    // Since the enemies will be on three rows, we should limit the
    // position of Y to be one of three rows.
    this.y = yPos;

    // This is the enemy name to keep track of
    this.name = enemyName;

    this.velocity = getRandomEnemySpeedFactor();

    console.log(this);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;
    if (this.x > 606) {
      this.x = colCoords[0];
      this.velocity = getRandomEnemySpeedFactor();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// HELPER FUNCTIONS
// ===========================================================================
// This will pick a random speed factor between 100 and 250, inclusive
function getRandomEnemySpeedFactor() {
  return Math.floor(Math.random() * (250 - 100)) + 100;
}
// This function will reset the player back to the starting position
function resetPlayer(player) {
  player.y = rowCoords[5];
}
// ===========================================================================

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = class {
  constructor() {
    // The image/sprite for our character
    this.sprite = 'images/char-boy.png';
    this.x = colCoords[6];
    this.y = rowCoords[5];
    this.reachedWater = false;
    this.touchedEnemy = false;
  }
}

// update(), render(), and handleInput() methods
Player.prototype.update = function(dir, dist) {
  if (dir === 'left') {
    this.x -= dist;
  } else if (dir === 'right') {
    this.x += dist;
  } else if (dir === 'up') {
    this.y -= dist;
  } else if (dir === 'down') {
    this.y += 83;
  }

  // Loop through every enemy and check to see matching coordindates
  for (let i = 0; i < allEnemies.length; i++) {
    let enemeyToCheck = allEnemies[i];
    let xCoordOfEnemy = enemeyToCheck.x;
    let xCoordOfPlayer = this.x;
    let diffBetweenPlayerAndEnemy = Math.abs(xCoordOfEnemy - xCoordOfPlayer);
    this.touchedEnemy = this.y == enemeyToCheck.y && diffBetweenPlayerAndEnemy < 30;
    if (this.touchedEnemy) {
      console.log('You touched an enemy!');
      resetPlayer(this)
    }
  }

};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyCode) {
  if (keyCode === 'left' && !(this.x - 101 == -101)) {
    player.update(keyCode, 101);
  }
  if (keyCode === 'right' && !(this.x + 101 == 505)) {
    player.update(keyCode, 101);
  }
  if (keyCode === 'up' && !(this.y - 83 == -124.5)) {
    player.update(keyCode, 83);
  }
  if (keyCode === 'down' && !(this.y + 83 == 456.5)) {
    player.update(keyCode, 101);
  }
  console.log(this.x, this.y);
  if (this.y < 0) {
    this.reachedWater = true;
    console.log('reached watter!')
  }

};

// Values defining board geometry
let rowCoords = [-41.5, 41.5, 124.5, 207.5, 290.5, 373.5]; // ROW Coordinates
let colCoords = [-404, -303, -202, -101, 0, 101, 202, 303, 404];       // COL Coordinates

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy('enemy1', colCoords[3], rowCoords[1]),
  new Enemy('enemy2', colCoords[3], rowCoords[2]),
  new Enemy('enemy3', colCoords[3], rowCoords[3]),
  new Enemy('enemy3', colCoords[0], rowCoords[1]),
  new Enemy('enemy3', colCoords[0], rowCoords[2]),
  new Enemy('enemy3', colCoords[0], rowCoords[3])
];
// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
