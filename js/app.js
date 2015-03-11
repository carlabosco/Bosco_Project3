// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = (Math.random() + 1) * 300;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    //Define enemy edges to check for collision
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;

    // Send enemies back to the leftmost edge of the screen
    if(this.x >= 470){
        this.x = 0;
    }

    this.checkCollisions(this, player);
}

Enemy.prototype.isColliding = function(enemy, player) {
   return !(player.left > enemy.right  ||
            player.right < enemy.left  ||
            player.top > enemy.bottom  ||
            player.bottom < enemy.top);
}

// Reset player position after collision
Enemy.prototype.checkCollisions = function(enemy, player) {
   if (this.isColliding(enemy, player)) {
       player.startOver();
   }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

//Define player edges to check for collision
Player.prototype.update = function(dt) {
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset player position after collision or victory
Player.prototype.startOver = function() {
   this.x = 200;
   this.y = 400;
}

Player.prototype.handleInput = function(allowedKey) {
    if(allowedKey === "left" && this.x > 30) {
        this.x = this.x - 60;
    }
    if(allowedKey === "right" && this.x < 350) {
        this.x = this.x + 60;
    }
    if(allowedKey === "up" && this.y > 10) {
        this.y = this.y - 70;
    }
    if(allowedKey === "down" && this.y < 400) {
        this.y = this.y + 70;
    }
    
    //Display message when player hits water
    if(this.y < 30) {
        alert("SPLASH!!! YOU WON!")
        player.startOver();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0, 300);
var enemy2 = new Enemy(0, 200);
var enemy3 = new Enemy(0, 100);
var allEnemies = [enemy1,enemy2,enemy3];
var player = new Player(200, 400);


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
