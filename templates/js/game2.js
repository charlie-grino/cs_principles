// global variables
let canvas;
let ctx;

let TILESIZE = 64;
let WIDTH = TILESIZE * 22;
let HEIGHT = TILESIZE * 9;
let allSprites = [];
let walls = [];
let enemies = [];
let allProjectiles = [];


let gamePlan = `
......................
..#.......@........#..
..#................#..
..#................#..
..#........#####...#..
..#####............#..
......#............#..
......##############..
......................`;

// get user input from keyboard
let keysDown = {};
let keysUp = {};

addEventListener("keydown", function (event) {
    // keysDown = {};
    keysDown[event.key] = true;
    // console.log(event);
}, false);

addEventListener("keyup", function (event) {
    keysUp[event.key] = true;
    delete keysDown[event.key];
    // console.log(event);
}, false);

// here we use init (short for initialize) to setup the canvas and context
// this function will be called in the HTML document in body onload = ""
// we also append the body with a new canvas element
function init() {
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    console.log("game initialized");
    document.body.appendChild(canvas);
    gameLoop();
}

class Sprite {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        allSprites.push(this);
    }
    get cx() {
        return this.x + this.w * 0.5;
    }
    get cy() {
        return this.y + this.h * 0.5;
    }
    get left() {
        return this.x
    }
    get right() {
        return this.x + this.w
    }
    get top() {
        return this.y
    }
    get midtop() {
        return this.y + this.w * 0.5;
    }
    get bottom() {
        return this.y + this.h
    }
    get midbottom() {
        return (this.y + this.h) + this.w * 0.5
    }
    get type() {
        return "sprite";
    }
    create(x, y, w, h, color) {
        return new Sprite(x, y, w, h, color);
    }
    collideWith(obj) {
        if (this.x + this.w >= obj.x &&
            this.x <= obj.x + obj.w &&
            this.y + this.h >= obj.y &&
            this.y <= obj.y + obj.h
        ) {
            return true;
        }
    }
    // modified from https://github.com/pothonprogramming/pothonprogramming.github.io/blob/master/content/rectangle-collision/rectangle-collision.html
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}

var pointer = {
    x: 0,
    y: 0
};


class Player extends Sprite {
    constructor(x, y, speed, w, h, color, hitpoints) {
        super(x, y, w, h, color);
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.speed = speed;
        this.w = w;
        this.h = h;
        this.canJump;
        this.gravity = 0.9;
        this.jumpPower = 25;
        this.color = color;
        this.hitpoints = hitpoints;
    }

    jump() {
        this.vy = -this.jumpPower;
        this.canJump = false;
    }
    // function that shoots projectile
    pewpew(){
        
    }

// defines the type of function
    get type() {
        return "player";
    }
    // defines the different inputs for the player when it comes to holding the jump keys
    input() {
        // checks for user input
        if ("a" in keysDown) { // Player holding left
            this.vx = -this.speed;
        } else if ("d" in keysDown) { // Player holding right
            this.vx = this.speed;
        } else if (" " in keysDown && this.canJump) { // Player holding jump
            this.jump();
        }
        // when w is held down then the pewpew function 
        else if ("w" in keysDown) {
            let p = new PewPew(this.x, this.y, TILESIZE/2, TILESIZE/2);
        }

    }
    //  update function tells sprite to collide with walls at certain x values
    update() {
        this.vy += this.gravity;
        this.input();
        this.x += this.vx;
        this.y += this.vy;  
        for (i of allSprites) {
            if (i.type == "wall") {
                if (this.collideWith(i)) {
                            if (this.cy <= i.top + 1){
                                    this.y  = i.top - this.h;
                                    this.canJump = true;
                                    this.vy = 0
                    }
                    else{this.canJump = false;}
                    if (this.cy > i.cy){
                        if (this.vx > 0) {
                            this.x = i.left - this.w;
                        }
                        else {this.x = i.right}
                        console.log('x collide');
                    }
                    // experimental wall grab below
                    // if (this.cx < i.cy){
                    //     this.x = i.x+this.w;
                    // }
                }
            }
        }
        // sets the width of the walls so the sprite can know where to collide
        if (this.x + this.w > WIDTH) {
            this.x = WIDTH - this.w;
        }
        if (this.x <= 0) {
            this.x = 0;
        }
        if (this.y + this.h > HEIGHT) {
            this.y = HEIGHT - this.h;
        }
        if (this.y <= 0) {
            this.y = 0;
        }
        
    };
    
}
// constructor function extends to the enemy sprite
class Enemy extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 6;
        this.color = "blue";
        enemies.push(this);
    }
    create(x, y, w, h) {
        return new Enemy(x, y, w, h);
    }
    get type() {
        return "enemy";
    }
    // update function tells the enemy to change directions at a certain point
    update() {
        if (this.right > WIDTH  || this.x < 0){
            this.speed *=-1;
        }
        this.x += this.speed;
    //     for (i of allSprites){
    //     if (i.type == "wall") {
    //         // if (this.collideWith(i) && this.right > i.left ) {
    //         //     console.log('enemy collided with wall');
    //         //         this.speed = -6;               
    //         // }

    //     }
    // }

    }
}

// constructor function extends to the sprite 
class Wall extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
    }
    get type() {
        return "wall";
    }
    create(x, y, w, h) {
        return new Wall(x, y, w, h);
    }
}
// constructor function that extends the pewpew to the sprite
class PewPew extends Sprite {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        allProjectiles.push(this);
        console.log('a pewpew was created...')
    }

    update(){
        this.y -=1;
    }
}


const levelChars = {
    ".": "empty",
    "#": Wall,
    "@": Enemy,

};

function makeGrid(plan, width) {
    let newGrid = [];
    let newRow = [];
    for (i of plan) {
        if (i != "\n") {
            newRow.push(i);
        }
        if (newRow.length % width == 0 && newRow.length != 0) {
            newGrid.push(newRow);
            newRow = [];
        }
    }
    return newGrid;
}

console.log("here's the grid...\n" + makeGrid(gamePlan, 22));

function readLevel(grid) {
    let startActors = [];
    // note the change from i to x and y
    for (y in grid) {
        for (x in grid[y]) {
            /*              crate a variable based on the current
            item in the two dimensional array being read
             */
            let ch = grid[y][x];
            /* if the character is not a new line character
            create a variable from the value attached to the 
            key in the object, e.g. 

            const levelChars = {
                ".": "empty",
                "#": Square,
            };

            where "." is the key and the value is "empty"
            In the case of "#", the key is "#" and the value
            is the Square class.
            
            */
            if (ch != "\n") {
                let type = levelChars[ch];
                if (typeof type == "string") {
                    startActors.push(type);
                } else {
                    let t = new type;
                    // let id = Math.floor(100*Math.random());
                    /*  Here we can use the x and y values from reading the grid, 
                        then adjust them based on the tilesize
                         */
                    startActors.push(t.create(x * TILESIZE, y * TILESIZE, TILESIZE, TILESIZE))
                }
            }
        }
    }
    return startActors;
}


let currentLevel = readLevel(makeGrid(gamePlan, 22))

console.log("here's the current level " + currentLevel)

// instantiations...
let player1 = new Player(WIDTH / 3, HEIGHT / 3, 6, TILESIZE, TILESIZE, 'rgb(100, 100, 100)', 100);


function update() {
    player1.update();
    for (e of enemies) {
        e.update();
    }
    for (p of allProjectiles){
        p.update();
    }

}
// we now have just the drawing commands in the function draw
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (i of allSprites) {
        // console.log(i);
        i.draw();
    }
}
// here we have a big leap!
// We are using the window.requestAnimationFrame() in our game loop
// .requestAnimationFrame() is a method (likg a function attached to an object)
// It tells the browser that you wish to animate
// It asks the browser to call a specific function, in our case gameLoop
// It uses this function to 'repaint'
// In JS this called a callback, where a function passes an argument to another function

// MDN reference https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

let then = performance.now();
let now = null;
let runtime = null;
let fps = null;


let gameLoop = function () {
    // console.log('the game loop is alive! now comment this out before it eats up memory...')
    now = performance.now();
    let delta = now - then;
    fps = (Math.ceil(1000 / delta));
    totaltime = now - then;
    // console.log(fps);
    // console.log(totaltime/1000);
    then = now;
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}
