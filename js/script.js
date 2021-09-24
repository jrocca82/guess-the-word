const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const userInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesLeft = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");


let remainingGuesses = 8;
let guessedLetterString = [];

//Fetch Words
const getWord = async function(){
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await request.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

//Display word to guess
const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
  };
  wordInProgress.innerText = placeholderLetters.join("");
};

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

//Input letters pressing enter key
guessLetterButton.addEventListener("keypress", function (e) {
  if (e.key === "Enter"){
      e.preventDefault();
      message.innerText = "";
      const guess = userInput.value;
      const validGuess = validateUserInput(guess);
      if (validGuess){
        makeGuess(guess);
      }
      userInput.value = "";
    };
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
    showGuessedLetters();
    countGuessesRemaining(guess);
    updateWordInProgress(guessedLetterString);
  }
};

//Display guessed letters
const showGuessedLetters = function(){
  //Clear list
  guessedLetters.innerHTML = "";
  //Display letter at end of array
  for (const letter of guessedLetterString){
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLetters.append(li);
  }
};

//Update wordInProgress
const updateWordInProgress = function (guessedLetterString) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray){
    if (guessedLetterString.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
    wordInProgress.innerText = revealWord.join("");
    checkWin();
  }
};

//Count remaining guesses
const countGuessesRemaining = function(guess){
  const upperWord = word.toUpperCase();
  if (upperWord.includes(guess)){
    //Wrong guess
    message.innerText = `Yeah! You got it! The word has the letter ${guess}`;
  } else {
    //Correct guess
    message.innerText = "Sorry! Try again!";
    remainingGuesses -= 1;
  };

  if (remainingGuesses === 0){
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
    startOver();
  } else if (remainingGuesses === 1){
    message.innerText = "You only have 1 guess left!";
    numGuessesLeft.innerText = `1 guess`
  } else {
    numGuessesLeft.innerText = `${remainingGuesses} guesses left`;
  }
}

//Check if user won
const checkWin = function(){
  if (word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the word! Congratulations!</p>`;

    startOver();
  }
};

//Play again
const startOver = function() {
  guessLetterButton.classList.add("hide");
  guessesLeft.classList.add("hide");
  guessedLetters.classList.add("hide");
  playAgain.classList.remove("hide");
};

//Pressing play again buttong
playAgain.addEventListener("click", function(){
  message.classList.remove("win");
  guessedLetters.innerHTML = "";
  message.innerText = "";
  guessedLetterString= [];
  remainingGuesses = 8;
  numGuessesLeft.innerText = `${remainingGuesses} guesses`;

  guessLetterButton.classList.remove("hide");
  guessesLeft.classList.remove("hide");
  guessedLetters.classList.remove("hide");
  playAgain.classList.add("hide");

  getWord();
});
