const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const userInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesLeft = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

//Placeholder Variables
const word = "magnolia";
const guessedLetterString = [];

//Display word to guess
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
  };
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//Guess letter button
guessLetterButton.addEventListener("click", function (e){
  //Prevent reloading page
  e.preventDefault();
  //Empty message
  message.innerText = "";
  //Read input
  const guess = userInput.value;
  //Validate userInput
  const validGuess = validateUserInput(guess);
  if (validGuess){
    makeGuess(guess);
  }
  //Clear input
  userInput.value = "";
});

//Function to validate user input
const validateUserInput = function(input){
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0){
    //Empty guess
    message.innerText = "You forgot to guess a letter!";
  } else if (input.length > 1){
    //Guessing multiple letters
    message.innerText = "Please guess one letter at a time.";
  } else if (!input.match(acceptedLetter)) {
    //Not a letter
    message.innerText = "That's not a letter! Please guess a letter (A-Z).";
  } else {
    //Valid guess
    return input;
  }
};

//Create list of guessed letters
const makeGuess = function(guess) {
  guess = guess.toUpperCase();
  if (guessedLetterString.includes(guess)) {
    //Repeat guess
    message.innerText = "You've already guessed this letter.";
  } else {
    guessedLetterString.push(guess);
    console.log(guessedLetterString);
  }
};
