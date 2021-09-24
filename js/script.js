const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const userInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const guessesLeft = document.querySelector(".remaining");
const numGuessesLeft = document.querySelector(".remaining span");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word){
    console.log(letter);
    placeholderLetters.push("●");
  };
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessLetterButton.addEventListener("click", function (e){
  e.preventDefault();
  const guess = e.letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
