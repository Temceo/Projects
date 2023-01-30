// Imported components
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HangmanImage from "./components/HangmanImage";
import Word from "./components/Word";
import IncorrectLetters from "./components/IncorrectLetters";
import CheckForWin from "./components/CheckForWin";
// List of words stored in json file
import words from "./wordList.json";

// Function to get random word
function getWord(words) {
  // Get random word from the list
  const word = words[Math.floor(Math.random() * words.length)];
  const index = words.indexOf(word);
  // Remove word that has been guessed to avoid repetition of same word
  words.splice(index, 1);
  return word;
}

let chosenWord = getWord(words);

function App() {
  let [inPlay, setInPlay] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  // Show alert if user enters word that has already been used
  function showAlert() {
    alert("You have already entered this letter!");
  }

  // Check keyboard entries for input from user - allow only entry of letters
  useEffect(() => {
    const handleKeydown = (e) => {
      const { key } = e;

      if (inPlay && key.match(/^[a-zA-Z]$/)) {
        const letter = key.toLowerCase();

        if (chosenWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            showAlert();
          }
        } else {
          if (!incorrectLetters.includes(letter)) {
            setIncorrectLetters((currentLetters) => [
              ...currentLetters,
              letter,
            ]);
          } else {
            showAlert();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, incorrectLetters, inPlay]);

  // Function to enable user to play again once round has ended
  function playAgain() {
    setInPlay = true;

    // Reset correct / incorrect letters arrays back to empty
    setCorrectLetters([]);
    setIncorrectLetters([]);

    // Choose a new word
    chosenWord = getWord(words);
  }

  // Components making up the web page display
  return (
    <div className="main-container">
      <Header incorrectLetters={incorrectLetters} />
      <HangmanImage incorrectLetters={incorrectLetters} />
      <Word chosenWord={chosenWord} correctLetters={correctLetters} />
      <IncorrectLetters incorrectLetters={incorrectLetters} />
      <CheckForWin
        correctLetters={correctLetters}
        incorrectLetters={incorrectLetters}
        chosenWord={chosenWord}
        setInPlay={setInPlay}
        playAgain={playAgain}
      />
    </div>
  );
}

export default App;
