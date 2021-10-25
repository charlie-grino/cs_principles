
// global variables go at the top
// setting point value for each letter of the alphabet
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
// setting alphabet as usable characters
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// player1 score starts at zero
let player1score = 0;
// player2 score starts at zero
let player2score = 0;

// utility functions
// run isupper function to see if one score is uppercase using a boolean(true or false)
function isupper(str) {
  return str === str.toUpperCase();
}

// run isupper function to see if one score is uppercase using a boolean(true or false)
function islower(str) {
  return str === str.toLowerCase();
}

// return points by associating the index of the letter with the POINTS array
function getPoints(letter){
  let index = Letters.indexOf(letter);
  return POINTS[index];
}

// can you in JS perform an islower/isupper and strlen?
function computeScore(word){
    let score = 0;
    for (i = 0, n = word.length; i < n; i++){
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        // states the letter
        console.log("letter is " + (word[i]));
        // state the score of the letter
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        // converts to lowercase
        score += getPoints(word[i].toLowerCase());
        // state final score
        console.log("final score here " + score);
    }
    // returns score
    return score;
}

function getInputValue() {
    // selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // displaying value
  }

 function doSomething(){
  //  computes score
    let score = computeScore(getInputValue())
    // alert message that communicates score 
    alert(`you scored ${score}` );
    // comunicates output or score
    output(`you scored ${score} points.`);
  }

  // failing function due to inability to access element on page and alter it dynamically
  function output(content){
    document.getElementById("display").innerHTML = content;
  }