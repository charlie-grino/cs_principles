// only javascript goes here NO HTML...
// pop window where you must click through to continue
alert("hello world");
// console message
console.log("this is coming from a separate file...")
// sets the variable
let myVar = 5;
// console message
console.log("my first console message");
// sets the variable in the console
console.log(myVar); 

// bool
let playing = true;
// sets width
let width = 200;
// sets the height
let height = 450;
// inputting coordinates for squares
let y = 34;
let x = 300;
// names square 1 as "Tim"
var player1 = "Tim";
// names square 2 as "Ralph"
const player2 = "Ralph";

// for loops in js
for (i=0; i<10; i++){
    console.log(i);
}

function draw() {
    // variable that allows the code to look for an element in the html document with an ID of 'canvas'
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(200, 0, 0)';
      ctx.fillRect(x, y, width, height);

      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(30, 30, 50, 50);
    }
  }

  draw();