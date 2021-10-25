// Comment pseudocode up here
// Objective: take a message from a user and encrypt it
// Then using the cypher decrypt it


/* 
1. Get input from user
2. Enact encryption function
3. recieve encrypted word
*/

// global variables go at the top
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
// establishes alphabet
let Letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "\n"];
// corresponding characters to the alphabet
let encryptKey = ["!", "@", "#", "$", "%", "^", "&", "*", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "o", "p", "q", "r", "s", "\n"];
// starting score is zero for each player
let player1score = 0;
let player2score = 0;

// this is how you can push things into an array that is empty...
let thingIwantToPush = "hello world I can push things into an array";
let myArr = [];
myArr.push(thingIwantToPush);
console.log("I just pushed something into this array " + myArr);

// utility functions
// check if is upper
function isupper(str) {
  return str === str.toUpperCase();
}

// check if is lower
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
    let currentword = "";
    for (i = 0, n = word.length; i < n; i++){
        let letter = encryptKey[i];
        currentword = currentword + i;
        // if (islower(word[i])){
        //   console.log(word[i] + "this is lower case");
        // }
        // if (isupper(word[i])){
        //   console.log(word[i] + " is upper case");
        // }
        console.log("letter is " + (word[i]));
        console.log("letter score is " + getPoints(word[i].toLowerCase()));
        score += getPoints(word[i].toLowerCase());
        console.log("final score here " + score);
    }
    return score;
}

computeScore("hello");


// SCOPE>>>>>>>>>>>

function getInputValue() {
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
  }

function encrypt(word){
  alert(word);
  // your encryption goes here...
}

 function doSomething(){
    let encryptedValue = encrypt(getInputValue())
    alert("Encrypted value is " + encryptedValue);
    output(encryptedValue);
  }

  let eMsg = "secret message";

  //access element on page and alter it dynamically
  function output(content){
    document.getElementById("display1").innerHTML = content;
    document.getElementById("display2").innerHTML = eMsg;
    document.getElementById("display3").innerHTML = "hello";
  }

