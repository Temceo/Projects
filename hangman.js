//Hangman
// 1. Display word as blanks
// 2. Give user 6 chances to guess word
// 3. End game if user correctly guesses the word within 6 tries
// 4. End game after 6 tries. Advise user of the correct word

// Replace letter with word - split / map - compare 2 arrays

"use strict";

const prompt = require("prompt-sync")({ sigint: true });

const words =
  "background palindrome lumberjack binoculars trampoline artichokes".split(
    " "
  );

let again = "y";

do {
  let word = words[Math.floor(Math.random() * words.length)].split("");
  let displayWord = [];

  console.log("H A N G M A N");
  console.log("=".repeat(30));
  console.log("You have 6 chances to guess the word");
  // console.log(`For testing - word is ${word.join("")}`);
  console.log("Numbers will be rejected");
  console.log("Multiply letters will be rejected");
  console.log("Repeat letter will be rejected");
  console.log("-".repeat(30));

  for (let i = 0; i < word.length; i++) {
    displayWord[displayWord.length] = "_";
  }

  console.log(displayWord.join("  "));
  console.log("");

  const MAX_GUESSES = 7;

  let wrongGuesses = 0;
  let userGuess = "";
  const guessedLetters = [];

  while (wrongGuesses < MAX_GUESSES) {
    userGuess = prompt("Enter a letter: ").toLowerCase();

    if (displayWord.includes(userGuess) || guessedLetters.includes(userGuess)) {
      console.log("You have previously chosen this letter");
    } else if (!isNaN(userGuess) || userGuess.length > 1 || userGuess === "") {
      console.log("Please enter a single letter");
    } else {
      guessedLetters.push(userGuess);
      if (!word.includes(userGuess)) {
        wrongGuesses++;
      }
    }

    word.forEach((letter, index) => {
      if (letter === userGuess && displayWord[index] === "_") {
        displayWord[index] = letter;
      }
    });

    if (
      word.length === displayWord.length &&
      word.every((letter, index) => letter === displayWord[index])
    ) {
      console.log(`You correctly guessed ${word.join("")}`);
      break;
    }

    console.log(displayWord.join("   "));
    console.log("-".repeat(30));
    console.log(`Guessed letters - ${guessedLetters.join("  ")}`);
    console.log(`Wrong guesses = ${wrongGuesses}`);
    console.log("-".repeat(30));
  }

  if (displayWord.includes("_")) {
    console.log(`You have run out of chances. The word is ${word.join("")}`);
  }

  again = prompt("Play again? (y/n): ").toLowerCase();
} while (again === "y");
