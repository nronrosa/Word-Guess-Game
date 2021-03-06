var userKey = ""; // the key the user pressed 
var letterArray = []; // the letters in the guess word
var userGuessArray = []; // the letters the user has pressed 
// var wins = 0;
var loss = 0;
var guesses = 10;


var startGame = document.getElementById("start-game");
startGame.onclick = function () {
    clear()

    // sets the guesses
    document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guesses;

    // What are the words
    var candyBar = ["snickers", "twix", "crunch", "butterfinger", "whatchamacallit", "payday", "kitkat", "heath", "babyruth", "rolo"];

    // Computer to choose word 
    var computerHangGuess = candyBar[Math.floor(Math.random() * candyBar.length)];
    // console.log("computer guess: " + computerHangGuess);

    //Count the number of letters in the guess word and create underscore placement
    for (var i = 0; i < computerHangGuess.length; i++) {
        // console.log("# of letters: " + computerHangGuess.length);
        letterArray.push(computerHangGuess.charAt(i));
        // console.log(letterArray);
        // adds the correct number of underscores    
        userGuessArray.push("_");
        // console.log("userGuessArray" + userGuessArray);
        document.getElementById("underscore").innerHTML = userGuessArray.join("");
    };

    // User Presses key and checks to see that if only letters
    document.onkeyup = function (event) {
        var userKey = event.key;
        // console.log("user pressed event.key: " + event.key)
        // checks if a letter character is entered and alerts if not
        var lettersOnly = /^[a-zA-Z]+$/;
        if (!userKey.match(lettersOnly)) {
            alert("ONLY letters allowed. Try again!");
        }
        else {

            var positions = [];
            //Find all the letters index in array
            for (var i = 0; i < letterArray.length; i++) {
                if (letterArray[i] === userKey) {
                    positions.push(i);
                }
            }
            // console.log("Positions: " + positions);
            // need to check userkey against the positions and replace proper underscore
            if (letterArray.includes(userKey)) {
                // userkey is IN array so 
                for (var i = 0; i < positions.length; i++) {
                    userGuessArray[positions[i]] = userKey;
                }
                document.getElementById("underscore").innerHTML = userGuessArray.join("");
            }
            else {
                // userkey not in letterArray so it becomes a used letter
                // console.log("key NOT in letterrarray FALSE");
                // checks for dupe
                if (document.getElementById("used-letters").innerHTML.includes(userKey)) {
                    alert("You've used that letter. Try again.");
                }
                else {
                    document.getElementById("used-letters").innerHTML += userKey;
                    // adds to loss
                    loss = 1;
                    // reduces # of guesses
                    guesses = guesses - loss;
                }
            }
            checkwinner()
  
        };

        //Checks for winner/loser and updates the counter and text
        function checkwinner() {
            if (userGuessArray.includes("_")) {
                // console.log(userGuessArray.includes("_") + "does include underscore userguessarray");
                if (guesses < 1) {
                    document.getElementById("guesses-remaining").innerHTML = "LOST";
                    document.getElementById("winner-loser").innerHTML = "LOSER"; 
                }
                else {
                    document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guesses;
                }
            }
            else {
                // console.log(userGuessArray.includes("_") + "NOPE no underscore userguessarray");
                document.getElementById("winner").innerHTML = "WINNER";
                document.getElementById("winner-loser").innerHTML = "WINNER";
            }
        };
    };
    function clear() {
        //Clear variables
        letterArray = [];
        userGuessArray = [];
        document.getElementById("underscore").innerHTML = "";
        document.getElementById("used-letters").innerHTML = "";
        document.getElementById("winner-loser").innerHTML = "";
        document.getElementById("winner").innerHTML = "";
        document.getElementById("guesses-remaining").innerHTML = "";
        guesses = 10;
    }
};




